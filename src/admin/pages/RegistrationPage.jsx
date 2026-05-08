import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import AdminLayout from '../components/AdminLayout'
import { Card, CardHead, PageTitle, Toggle, Field, SaveBtn, Toast } from '../components/UI'
import { useSettings } from '../../contexts/SettingsContext'
import { saveSettings } from '../../services/settingsService'

export default function RegistrationPage() {
  const { settings } = useSettings()
  const [regOpen, setRegOpen]   = useState(false)
  const [whatsapp, setWhatsapp] = useState('')
  const [cities, setCities]     = useState('')
  const [saving, setSaving]     = useState(false)
  const [toast, setToast]       = useState(null)

  useEffect(() => {
    setRegOpen(settings.registrationOpen ?? false)
    setWhatsapp(settings.whatsappNumber   ?? '')
    setCities(settings.trialsCityCount    ?? '')
  }, [settings])

  const show = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveSettings({ registrationOpen: regOpen, whatsappNumber: whatsapp, trialsCityCount: cities })
      show('Settings saved!')
    } catch { show('Save failed — try again.', 'error') }
    finally { setSaving(false) }
  }

  return (
    <AdminLayout>
      <AnimatePresence>{toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>

      <PageTitle icon="📋" title="Registration Settings" subtitle="Control registration availability and key site info" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Toggle */}
        <Card>
          <CardHead icon="🔄" title="Registration Toggle" subtitle="Turn registrations on or off instantly" />
          <div className="p-5">
            <div className={`rounded-xl p-4 mb-4 border-2 font-black text-base ${regOpen ? 'bg-green-50 border-green-300 text-green-700' : 'bg-red-50 border-red-300 text-red-700'}`}>
              {regOpen ? '✅ Registrations are OPEN' : '🚫 Registrations are CLOSED'}
            </div>
            <Toggle
              label="Enable Registrations"
              description="When ON, the Register button opens the Google Form. When OFF, it shows the Coming Soon modal."
              checked={regOpen}
              onChange={setRegOpen}
            />
          </div>
        </Card>

        {/* Contact / misc */}
        <Card>
          <CardHead icon="📱" title="Contact & Reach" subtitle="Displayed on the website" />
          <div className="p-5 flex flex-col gap-4">
            <Field
              label="WhatsApp Number (with country code)"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              placeholder="919250324379"
              hint="Format: 91XXXXXXXXXX — no + sign, no spaces"
            />
            <Field
              label="Trials City Count"
              value={cities}
              onChange={e => setCities(e.target.value)}
              placeholder="20+"
              hint='Displayed in the Trials section e.g. "20+", "25 Cities"'
            />
          </div>
        </Card>
      </div>

      <div className="mt-5 flex justify-end">
        <SaveBtn onClick={handleSave} loading={saving} />
      </div>
    </AdminLayout>
  )
}
