import React from 'react'
import { WaterIntake } from '@/types/water'

interface TodayHistoryProps {
  intake?: WaterIntake[] 
  onDeleteIntake: (id: string) => void
}

const TodayHistory: React.FC<TodayHistoryProps> = ({ intake, onDeleteIntake }) => {
  const today = new Date().toISOString().split('T')[0]

  const todayIntakes = (intake?.filter(i => i.date === today) ?? []).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const formatTime = (timestamp: Date | string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  if (!intake || intake.length === 0) {
    return <div className="text-gray-500">No intake records yet.</div>
  }

  return (
    <div className="space-y-2">
      {todayIntakes.map(entry => (
        <div
          key={entry.id}
          className="flex justify-between items-center bg-white rounded-xl shadow px-4 py-2"
        >
          <div>
            <div className="text-sm font-medium text-gray-800">{entry.amount}ml</div>
            <div className="text-xs text-gray-500">{formatTime(entry.timestamp)}</div>
          </div>
          <button
            onClick={() => onDeleteIntake(entry.id)}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default TodayHistory