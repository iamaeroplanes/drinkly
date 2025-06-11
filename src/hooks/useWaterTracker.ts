import { useState, useEffect } from 'react';
import { WaterIntake, DailyGoal, WaterStats } from '@/types/water';

export const useWaterTracker = () => {
    const [intakes, setIntakes] = useState<WaterIntake[]>([]);
    const [dailyGoal, setDailyGoal] = useState<number>(2000);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const savedIntakes = localStorage.getItem('waterIntakes');
        const savedGoal = localStorage.getItem('dailyGoal');
        
        if (savedIntakes) {
            const parsedIntakes = JSON.parse(savedIntakes).map((intake: any) => ({
                ...intake,
                timestamp: new Date(intake.timestamp),
            }));
            setIntakes(parsedIntakes);
        }

        if (savedGoal) {
            setDailyGoal(parseInt(savedGoal));
        }
    };

    const saveData = (newIntakes: WaterIntake[], newGoal?: number) => {
        localStorage.setItem('waterIntakes', JSON.stringify(newIntakes));
        if (newGoal) {
            localStorage.setItem('dailyGoal', newGoal.toString());
        }
    };

    const addWaterIntake = (amount: number) => {
        const newIntake: WaterIntake = {
            id: Date.now().toString(),
            amount,
            timestamp: new Date(),
            date: new Date().toISOString().split('T')[0],
        };

        const newIntakes = [...intakes, newIntake];
        setIntakes(newIntakes);
        saveData(newIntakes);
    };

    const updateDailyGoal = (newGoal: number) => {
        setDailyGoal(newGoal);
        saveData(intakes, newGoal);
    };

    const getTodayStats = (): WaterStats => {
        const today = new Date().toISOString().split('T')[0];
        const todayIntakes = intakes.filter(intake => intake.date === today);
        const totalToday = todayIntakes.reduce((sum, intake) => sum + intake.amount, 0);

        return {
            totalToday,
            goalToday: dailyGoal,
            percentage: Math.min((totalToday / dailyGoal) * 100, 100),
            streak: calculateStreak(),
            weeklyAverage: calculateWeeklyAverage(),
        };
    };

    const calculateStreak = (): number => {
        const dates = [...new Set(intakes.map(intake => intake.date))].sort().reverse();
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];

        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const dayIntakes = intakes.filter(intake => intake.date === date);
            const dayTotal = dayIntakes.reduce((sum, intake) => sum + intake.amount, 0);
            if (dayTotal >= dailyGoal) {
                streak++;
            } else {
                // If we hit a day without meeting the goal, break the streak}
                break;
            }
        }

        return streak;
    };

    const calculateWeeklyAverage = (): number => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const weekIntakes = intakes.filter(intake => new Date(intake.timestamp) >= weekAgo);

        const dailyTotals = new Map<string, number>();
        weekIntakes.forEach(intake => {
            const date = intake.date;
            dailyTotals.set(date, (dailyTotals.get(date) || 0) + intake.amount);
        });

        const totals = Array.from(dailyTotals.values());
        return totals.length > 0 ? totals.reduce((sum, total) => sum + total, 0) / totals.length : 0;
    };

    const deleteIntake = (id: string) => {
        const newIntakes = intakes.filter(intake => intake.id !== id);
        setIntakes(newIntakes);
        saveData(newIntakes);
    };

    return {
        intakes,
        dailyGoal,
        loading,
        addWaterIntake,
        updateDailyGoal,
        getTodayStats,
        deleteIntake,
    };
};