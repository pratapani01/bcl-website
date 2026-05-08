import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import AdminLayout from '../components/AdminLayout'
import { Card, CardHead, PageTitle, Toggle, SaveBtn, Toast } from '../components/UI'
import { useSettings } from '../../contexts/SettingsContext'
import { saveSettings } from '../../services/settingsService'

const SECTIONS = [
  { key: 'showPrizeSection',  icon: '💰', label: 'Prize Money Section',  desc: 'The ₹22L prize pool cards on the homepage' },
  { key: 'showTrialsSection', icon: '🏙️', label: 'Trials Cities Section', desc: 'The scrolling cities strip' },
  { key: 'showTimeline',      icon: '📅', label: 'Timeline / Schedule',   desc: 'Event timeline section' },
  { key: 'showTeamsSection',  icon: '🏏', label: 'Teams Section',         desc: 'BCL franchise teams grid' },
]

export default function SectionsPage() {
  const { settings } = useSettings()
  const [vis, setVis]   = useState({})
  const [saving, setSaving] = useState(false)
  const [toast, setToast]   = useState(null)

  useEffect(() => {
    const init = {}
    SECTIONS.forEach(s => { init[s.key] = settings[s.key] !== false })
    setVis(init)
  }, [settings])

  const show = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveSettings(vis)
      show('Section visibility saved!')
    } catch { show('Save failed — try again.', 'error') }
    finally { setSaving(false) }
  }

  return (
    <AdminLayout>
      <AnimatePresence>{toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>

      <PageTitle icon="👁️" title="Section Visibility" subtitle="Show or hide sections on the homepage instantly" />

      <Card>
        <CardHead icon="🎛️" title="Homepage Sections" subtitle="Changes take effect immediately for all visitors" />
        <div className="px-5 py-2 divide-y divide-gray-100">
          {SECTIONS.map(s => (
            <div key={s.key} className="flex items-center gap-3">
              <span className="text-xl w-8 flex-shrink-0">{s.icon}</span>
              <Toggle
                label={s.label}
                description={s.desc}
                checked={vis[s.key] ?? true}
                onChange={val => setVis(prev => ({ ...prev, [s.key]: val }))}
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-5 flex justify-end">
        <SaveBtn onClick={handleSave} loading={saving} />
      </div>
    </AdminLayout>
  )
}
