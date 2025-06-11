import React from 'react';
import { WaterStats } from '@/types/water';
import { Target, Flame, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  stats: WaterStats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
    const { streak, weeklyAverage, percentage } = stats;

    const statsData = [
        {
            icon: Flame,
            label: 'Day Streak',
            value: streak,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
        {
            icon: TrendingUp,
            label: 'Weekly Avg',
            value: `${Math.round(weeklyAverage)} ml`,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            icon: Target,
            label: 'Progress',
            value: `${Math.round(percentage)}%`,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        }
    ];

    return (
        <div className="bg-white rounded-2x1 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Stats</h3>

            <div className="grid grid-cols-3 gap-4">
                {statsData.map(({ icon: Icon, label, value, color, bgColor }) => (
                    <div key={label} className="text-center">
                        <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                            <Icon className={`w-6 h-6 ${color}`} />
                        </div>
                        <div className="font-bold text-lg text-gray-800">{value}</div>
                        <div className="text-xs text-gray-600">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsCard;