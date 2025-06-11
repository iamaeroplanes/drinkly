import React from 'react';
import { WaterStats } from '@/types/water';

interface WaterProgressProps {
  stats: WaterStats;
}

const WaterProgress: React.FC<WaterProgressProps> = ({ stats }) => {
  const { totalToday, goalToday, percentage } = stats;
  const radius = 100;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * Math.PI * 2;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3x1 shadow-lg">
          <div className="relative w-48 h-48 mb-4">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                stroke="#e0f2fe"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Progress circle */}
              <circle
                stroke="url(#gradient)"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="transition-all duration-500 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                </defs>
            </svg>

            {/* Centered content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-3x1 font-bold text-gray-800 mb-1">
                    {totalToday}ml
                </div>
                <div className="text-sm text-gray-600 mb-2">
                    of {goalToday}ml
                </div>
                <div className="text-lg font-semibold text-blue-600">
                    {Math.round(percentage)}%
                </div>
            </div>
        </div>

        {/* Wave animation at bottom when goal is reached */}
        {percentage >= 100 && (
          <div className="text-center">
            <div className="text-2x1 mb-2">🎉</div>
            <div className="text-lg font-semibold text-green-600">
                Goal Reached!
            </div>
          </div>
        )}
    </div>           
    );
};

export default WaterProgress