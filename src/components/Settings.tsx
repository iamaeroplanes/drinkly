import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useNotifications } from '@/hooks/useNotifications'
import { Settings as SettingsIcon, Bell, Target } from 'lucide-react'

interface SettingsProps {
  dailyGoal: number
  onUpdateGoal: (goal: number) => void
}

const Settings: React.FC<SettingsProps> = ({ dailyGoal, onUpdateGoal }) => {
  const [goalInput, setGoalInput] = useState(dailyGoal.toString())
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const { permission, requestPermission, reminderInterval, setReminderInterval } = useNotifications()

  const handleGoalUpdate = () => {
    const newGoal = parseInt(goalInput)
    if (newGoal > 0) {
      onUpdateGoal(newGoal)
    }
  }

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled && permission !== 'granted') {
      const granted = await requestPermission()
      setNotificationsEnabled(granted)
    } else {
      setNotificationsEnabled(enabled)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
        <SettingsIcon className="w-5 h-5 mr-2 text-blue-500" />
        Settings
      </h3>

      <div className="space-y-6">
        {/* Daily Goal */}
        <div>
          <Label htmlFor="dailyGoal" className="text-sm font-medium text-gray-700 flex items-center mb-2">
            <Target className="w-4 h-4 mr-2" />
            Daily Goal (ml)
          </Label>
          <div className="flex gap-2">
            <Input
              id="dailyGoal"
              type="number"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className="flex-1"
              min="500"
              max="5000"
              step="250"
            />
            <Button onClick={handleGoalUpdate} className="bg-blue-500 hover:bg-blue-600">
              Update
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <Label className="text-sm font-medium text-gray-700 flex items-center mb-3">
            <Bell className="w-4 h-4 mr-2" />
            Reminders
          </Label>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Enable notifications</span>
            <Switch checked={notificationsEnabled} onCheckedChange={handleNotificationToggle} />
          </div>

          {notificationsEnabled && (
            <div>
              <Label htmlFor="reminderInterval" className="text-sm text-gray-600 mb-1 block">
                Reminder interval (minutes)
              </Label>
              <Input
                id="reminderInterval"
                type="number"
                value={reminderInterval}
                onChange={(e) => setReminderInterval(parseInt(e.target.value) || 60)}
                min="15"
                max="240"
                step="15"
              />
            </div>
          )}
        </div>

        {/* Reset Data */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            onClick={() => {
              if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
                localStorage.clear()
                window.location.reload()
              }
            }}
            variant="destructive"
            className="w-full"
          >
            Reset All Data
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Settings
