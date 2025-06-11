import React from 'react';
import { Button } from '@/components/ui/button';
import { Droplets, Coffee, Wine } from 'lucide-react';

interface QuickAddProps {
    onAddWater: (amount: number) => void;
}

const QuickAdd: React.FC<QuickAddProps> = ({ onAddWater }) => {
    const quickAmounts = [
        { amount: 250, label: '1 Cup', icon: Coffee, color: 'bg-amber-500 hover:bg-amber-600'},
        { amount: 500, label: '1 Bottle', icon: Droplets, color: 'bg-blue-500 hover:bg-blue-600'},
        { amount: 750, label: '1 Large', icon: Wine, color: 'bg-cyan-500 hover: bg-cyan-600'}, 
];

return (
    <div className="bg-white rounded-2x1 shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Add</h3>
    
    <div className="grid grid-cols-3 gap-3 mb-4">
        {quickAmounts.map(({ amount, label, icon: Icon, color }) => (
            <Button
                key={amount}
                onClick={() => onAddWater(amount)}
                className={`${color} text-white flex flex-col items-center p4 h-auto transition-all duration-200 hover:scale-105 active:scale-95`}
            >
            <Icon className="w-6 h-6 mb-2" />
            <span className="text-xs font-medium">{label}</span>
            <span className="text-xs opacity-90">{amount} ml</span>
            </Button>
        ))}
    </div>

    <Button
        onClick={() => {
            const customAmount = prompt('Enter custom amount (ml):');
            if (customAmount && !isNaN(Number(customAmount))) {
                onAddWater(Number(customAmount));
            }
        }}
        variant="outline"
        className="w-full border-blue-200 hover:bg-blue-50 transition-colors duration-200"
    >
        <Droplets className="w-4 h-4 mr-2" />
        Custom amount
    </Button>
</div>
);
};

export default QuickAdd;
// This component provides quick buttons for adding common water amounts