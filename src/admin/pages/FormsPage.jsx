import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import AdminLayout from '../components/AdminLayout'
import { Card, CardHead, PageTitle, Field, SaveBtn, Toast } from '../components/UI'
import { useSettings } from '../../contexts/SettingsContext'
import { saveSettings } from '../../services/settingsService'

export default function FormsPage() {
  const { settings } = useSettings()
  const [batsman,    setBatsman]    = useState('')
  const [bowler,     setBowler]     = useState('')
  const [allRounder, setAllRounder] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast,  setToast]  = useState(null)

  useEffect(() => {
    setBatsman(settings.batsmanFormLink    ?? '')
    setBowler(settings.bowlerFormLink      ?? '')
    setAllRounder(settings.allRounderFormLink ?? '')
  }, [settings])

  const show = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveSettings({ batsmanFormLink: batsman, bowlerFormLink: bowler, allRounderFormLink: allRounder })
      show('Form links updated!')
    } catch { show('Save failed — try again.', 'error') }
    finally { setSaving(false) }
  }

  const forms = [
    {
      icon: '🏏', label: 'Batsman Form Link',      color: 'border-bcl-blue/30 bg-blue-50/50',
      value: batsman,    onChange: e => setBatsman(e.target.value),
      placeholder: 'https://forms.gle/...',
      hint: 'Opened when a user clicks Register → Batsman',
    },
    {
      icon: '⚾', label: 'Bowler Form Link',        color: 'border-red-200 bg-red-50/50',
      value: bowler,     onChange: e => setBowler(e.target.value),
      placeholder: 'https://forms.gle/...',
      hint: 'Opened when a user clicks Register → Bowler',
    },
    {
      icon: '⭐', label: 'All-Rounder Form Link',   color: 'border-yellow-200 bg-yellow-50/50',
      value: allRounder, onChange: e => setAllRounder(e.target.value),
      placeholder: 'https://forms.gle/...',
      hint: 'Opened when a user clicks Register → All Rounder',
    },
  ]

  return (
    <AdminLayout>
      <AnimatePresence>{toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>

      <PageTitle icon="🔗" title="Registration Form Links" subtitle="Each role has its own separate Google Form link" />

      <div className="flex flex-col gap-5">
        {forms.map(f => (
          <Card key={f.label} className={`border-2 ${f.color}`}>
            <CardHead icon={f.icon} title={f.label} />
            <div className="p-5">
              <Field
                value={f.value}
                onChange={f.onChange}
                placeholder={f.placeholder}
                hint={f.hint}
              />
              {f.value && (
                <a
                  href={f.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-bcl-blue hover:underline"
                >
                  🔗 Preview form →
                </a>
              )}
            </div>
          </Card>
        ))}

        <div className="flex justify-end">
          <SaveBtn onClick={handleSave} loading={saving} />
        </div>
      </div>
    </AdminLayout>
  )
}
