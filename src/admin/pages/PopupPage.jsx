import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import AdminLayout from '../components/AdminLayout'
import { Card, CardHead, PageTitle, TextArea, SaveBtn, Toast } from '../components/UI'
import { useSettings } from '../../contexts/SettingsContext'
import { saveSettings } from '../../services/settingsService'

export default function PopupPage() {
  const { settings } = useSettings()
  const [announcement, setAnnouncement] = useState('')
  const [popup,        setPopup]        = useState('')
  const [comingSoon,   setComingSoon]   = useState('')
  const [saving, setSaving] = useState(false)
  const [toast,  setToast]  = useState(null)

  useEffect(() => {
    setAnnouncement(settings.announcementText ?? '')
    setPopup(settings.popupText              ?? '')
    setComingSoon(settings.comingSoonText    ?? '')
  }, [settings])

  const show = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveSettings({ announcementText: announcement, popupText: popup, comingSoonText: comingSoon })
      show('Text updated successfully!')
    } catch { show('Save failed — try again.', 'error') }
    finally { setSaving(false) }
  }

  return (
    <AdminLayout>
      <AnimatePresence>{toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>

      <PageTitle icon="📢" title="Popup & Announcement" subtitle="Edit the text shown in popups and banners" />

      <div className="flex flex-col gap-5">
        <Card>
          <CardHead icon="📣" title="Homepage Announcement" subtitle="Shown as a badge/text in the hero section" />
          <div className="p-5">
            <TextArea
              label="Announcement Text"
              value={announcement}
              onChange={e => setAnnouncement(e.target.value)}
              placeholder="BCL Season 1 – India's biggest grassroots cricket league is here!"
              rows={2}
            />
          </div>
        </Card>

        <Card>
          <CardHead icon="🪟" title="Welcome Popup" subtitle="Shown automatically after 6 seconds on the homepage" />
          <div className="p-5">
            <TextArea
              label="Popup Description Text"
              value={popup}
              onChange={e => setPopup(e.target.value)}
              placeholder="Welcome to BCL! Registrations opening soon. Stay tuned for updates."
              rows={3}
            />
          </div>
        </Card>

        <Card>
          <CardHead icon="🚀" title="Coming Soon Modal" subtitle="Shown when someone tries to register but registrations are closed" />
          <div className="p-5">
            <TextArea
              label="Coming Soon Message"
              value={comingSoon}
              onChange={e => setComingSoon(e.target.value)}
              placeholder="BCL T20 registrations will open shortly. Stay connected and don't miss your chance to play."
              rows={3}
            />
          </div>
        </Card>

        {/* Live preview */}
        <Card>
          <CardHead icon="👁️" title="Popup Preview" subtitle="Approximate preview of the welcome popup" />
          <div className="p-5">
            <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-xl border overflow-hidden">
              <div className="bg-gradient-to-r from-bcl-blue to-blue-800 px-5 py-4">
                <p className="text-bcl-gold text-[10px] font-bold uppercase tracking-widest mb-1">Bharatiya Cricket League – Season 1</p>
                <h3 className="text-white font-black text-base">Welcome to BCL! 🏏🔥</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-gray-600 text-xs leading-relaxed">{popup || 'Popup text will appear here…'}</p>
                <div className="mt-3 flex gap-2">
                  <div className="flex-1 py-1.5 rounded-lg border border-gray-200 text-center text-[10px] font-semibold text-gray-500">Continue</div>
                  <div className="flex-1 py-1.5 rounded-lg bg-green-500 text-center text-[10px] font-semibold text-white">WhatsApp</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <SaveBtn onClick={handleSave} loading={saving} />
        </div>
      </div>
    </AdminLayout>
  )
}
