import AdminLayout from '../components/AdminLayout'
import { Card, CardHead, PageTitle, Field, TextArea, ReadOnlyBadge } from '../components/UI'
import { useSettings } from '../../contexts/SettingsContext'

export default function ManagerSettingsView() {
  const { settings } = useSettings()

  const boolLabel = val => val ? '✅ Yes / Visible' : '🚫 No / Hidden'

  return (
    <AdminLayout>
      <PageTitle icon="⚙️" title="Settings View" subtitle="Full read-only view of all live settings" />
      <ReadOnlyBadge />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Registration */}
        <Card>
          <CardHead icon="📋" title="Registration" />
          <div className="p-5 flex flex-col gap-3">
            <div className={`px-4 py-3 rounded-xl border-2 font-bold text-sm ${settings.registrationOpen ? 'bg-green-50 border-green-300 text-green-700' : 'bg-red-50 border-red-300 text-red-700'}`}>
              {settings.registrationOpen ? '✅ Registrations OPEN' : '🚫 Registrations CLOSED'}
            </div>
            <Field label="WhatsApp Number" value={settings.whatsappNumber}    readOnly />
            <Field label="Trial Cities"    value={settings.trialsCityCount}   readOnly />
          </div>
        </Card>

        {/* Prize money */}
        <Card>
          <CardHead icon="💰" title="Prize Money" />
          <div className="p-5 flex flex-col gap-3">
            <Field label="Winner Prize"     value={settings.prizeWinner}      readOnly />
            <Field label="Runner-Up Prize"  value={settings.prizeRunnerUp}    readOnly />
            <Field label="Auction Base"     value={settings.prizeAuctionBase} readOnly />
            <Field label="Auction Label"    value={settings.auctionText}      readOnly />
          </div>
        </Card>

        {/* Form links */}
        <Card>
          <CardHead icon="🔗" title="Registration Form Links" />
          <div className="p-5 flex flex-col gap-3">
            <Field label="Batsman Form"     value={settings.batsmanFormLink    || '(not set)'} readOnly />
            <Field label="Bowler Form"      value={settings.bowlerFormLink     || '(not set)'} readOnly />
            <Field label="All-Rounder Form" value={settings.allRounderFormLink || '(not set)'} readOnly />
          </div>
        </Card>

        {/* Hero text */}
        <Card>
          <CardHead icon="🎯" title="Hero Section" />
          <div className="p-5 flex flex-col gap-3">
            <Field label="Hero Title"    value={settings.heroTitle}    readOnly />
            <Field label="Hero Subtitle" value={settings.heroSubtitle} readOnly />
          </div>
        </Card>

        {/* Text content */}
        <Card className="lg:col-span-2">
          <CardHead icon="📢" title="Text Content" />
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextArea label="Announcement"  value={settings.announcementText} readOnly rows={2} />
            <TextArea label="Popup Text"    value={settings.popupText}        readOnly rows={2} />
            <TextArea label="Coming Soon"   value={settings.comingSoonText}   readOnly rows={2} />
          </div>
        </Card>

        {/* Section visibility */}
        <Card className="lg:col-span-2">
          <CardHead icon="👁️" title="Section Visibility" />
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: 'showPrizeSection',  label: '💰 Prizes' },
              { key: 'showTrialsSection', label: '🏙️ Trials' },
              { key: 'showTimeline',      label: '📅 Timeline' },
              { key: 'showTeamsSection',  label: '🏏 Teams' },
            ].map(s => (
              <div key={s.key} className={`px-4 py-3 rounded-xl border-2 text-xs font-bold text-center ${settings[s.key] !== false ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                {s.label}<br />
                <span className="font-normal">{settings[s.key] !== false ? 'Visible' : 'Hidden'}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
