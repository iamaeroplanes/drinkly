export interface WaterIntake {
    id: string;
    amount: number; // in mls
    timestamp: Date; // when the intake was recorded
    date: string; // formatted as YYYY-MM-DD
};

export interface DailyGoal {
    amount: number; // daily goal in mls
    lastUpdated: Date;
};

export interface WaterStats {
    totalToday: number;
    goalToday: number;
    percentage: number;
    streak: number;
    weeklyAverage: number;
};

export interface User {
    id: string;
    name: string;
    email: string;
    dailyGoal: number;
    reminderInterval: number;
    reminderEnabled: boolean;
}