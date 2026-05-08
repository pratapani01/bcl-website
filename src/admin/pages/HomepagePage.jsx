import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import AdminLayout from '../components/AdminLayout'
import { Card, CardHead, PageTitle, Field, SaveBtn, Toast } from '../components/UI'
import { useSettings } from '../../contexts/SettingsContext'
import { saveSettings } from '../../services/settingsService'

export default function HomepagePage() {
  const { settings } = useSettings()

  // Hero text
  const [heroTitle,    setHeroTitle]    = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')

  // Prize money
  const [prizeWinner,  setPrizeWinner]  = useState('')
  const [prizeRunner,  setPrizeRunner]  = useState('')
  const [prizeAuction, setPrizeAuction] = useState('')
  const [auctionLabel, setAuctionLabel] = useState('')

  const [saving, setSaving] = useState(false)
  const [toast,  setToast]  = useState(null)

  useEffect(() => {
    setHeroTitle(settings.heroTitle        ?? '')
    setHeroSubtitle(settings.heroSubtitle  ?? '')
    setPrizeWinner(settings.prizeWinner    ?? '')
    setPrizeRunner(settings.prizeRunnerUp  ?? '')
    setPrizeAuction(settings.prizeAuctionBase ?? '')
    setAuctionLabel(settings.auctionText   ?? '')
  }, [settings])

  const show = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveSettings({
        heroTitle,
        heroSubtitle,
        prizeWinner,
        prizeRunnerUp:    prizeRunner,
        prizeAuctionBase: prizeAuction,
        auctionText:      auctionLabel,
      })
      show('Homepage settings saved!')
    } catch { show('Save failed — try again.', 'error') }
    finally { setSaving(false) }
  }

  return (
    <AdminLayout>
      <AnimatePresence>{toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>

      <PageTitle icon="🏏" title="Homepage Controls" subtitle="Edit hero text, prize money and auction details" />

      <div className="flex flex-col gap-5">
        {/* Hero section text */}
        <Card>
          <CardHead icon="🎯" title="Hero Section Text" subtitle="The large heading and sub-text on the homepage slider" />
          <div className="p-5 flex flex-col gap-4">
            <Field
              label="Hero Title"
              value={heroTitle}
              onChange={e => setHeroTitle(e.target.value)}
              placeholder="Bharatiya Cricket League"
            />
            <Field
              label="Hero Subtitle"
              value={heroSubtitle}
              onChange={e => setHeroSubtitle(e.target.value)}
              placeholder="Season 1 Registrations Coming Soon"
            />
          </div>
        </Card>

        {/* Prize money */}
        <Card>
          <CardHead icon="💰" title="Prize Money" subtitle="Shown in the Prizes section on the homepage" />
          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field
              label="Winner Prize"
              value={prizeWinner}
              onChange={e => setPrizeWinner(e.target.value)}
              placeholder="₹15 Lakhs"
            />
            <Field
              label="Runner-Up Prize"
              value={prizeRunner}
              onChange={e => setPrizeRunner(e.target.value)}
              placeholder="₹7 Lakhs"
            />
            <Field
              label="Auction Base Price"
              value={prizeAuction}
              onChange={e => setPrizeAuction(e.target.value)}
              placeholder="₹51K"
            />
          </div>
        </Card>

        {/* Auction text */}
        <Card>
          <CardHead icon="🔨" title="Auction Text" subtitle="Label shown under the auction base price tile" />
          <div className="p-5">
            <Field
              label="Auction Label"
              value={auctionLabel}
              onChange={e => setAuctionLabel(e.target.value)}
              placeholder="Minimum Base Price"
              hint='Displayed under the ₹51K tile in the Prizes section'
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <SaveBtn onClick={handleSave} loading={saving} />
        </div>
      </div>
    </AdminLayout>
  )
}
