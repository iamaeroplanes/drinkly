import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWaterTracker } from '@/hooks/useWaterTracker';
import { useNotifications } from '@/hooks/useNotifications';
import WaterProgress from '@/components/WaterProgress';
import QuickAdd from '@/components/QuickAdd';
import TodayHistory from '@/components/TodayHistory';
import StatsCard from '@/components/StatsCard';
import Settings from '@/components/Settings';
import { Droplets, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const {
    intakes,
    dailyGoal,
    addWaterIntake,
    updateDailyGoal,
    getTodayStats,
    deleteIntake
  } = useWaterTracker();

  const { scheduleReminder } = useNotifications();

  const stats = getTodayStats();

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Set up reminder schedule
    const cleanup = scheduleReminder();
    return cleanup;
  }, []);

  const handleAddWater = (amount: number) => {
    addWaterIntake(amount);
    toast({
      title: "Water added! 💧",
      description: `Added ${amount}ml to your daily intake`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <Droplets className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Drinkly</h1>
          </div>
          <p className="text-gray-600">Stay hydrated, stay healthy</p>
        </div>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Track
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            {/* Progress Circle */}
            <div className="flex justify-center">
              <WaterProgress stats={stats} />
            </div>

            {/* Quick Add */}
            <QuickAdd onAddWater={handleAddWater} />

            {/* Today's History */}
            <TodayHistory intake={intakes} onDeleteIntake={deleteIntake} />
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <StatsCard stats={stats} />

            {/* Weekly Progress Chart Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Progress</h3>
                <div className="h-48 bg-gray-100 rounded-xl flex items-center flex-col justify-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p>Chart coming soon!</p>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Settings dailyGoal={dailyGoal} onUpdateGoal={updateDailyGoal} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
