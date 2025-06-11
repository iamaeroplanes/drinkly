import { useState, useEffect } from 'react';

export const useNotifications = () => {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [reminderInterval, setReminderInterval] = useState(60); // minutes

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if ('Notification' in window) {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result === 'granted';
        }
        return false;
    };

    const sendNotification = (title: string, body: string) => {
        if (permission === 'granted') {
            new Notification(title, { 
                body,
                icon: '/placeholder.svg',
                tag: 'water-reminder'
             });
        }
        
    };

    const scheduleReminder = () => {
        if (permission === 'granted') {
            const interval = setInterval(() => {
                sendNotification(
                    'Time to hydrate!',
                    'Remember to drink water and stay hydrated throughout the day!'
                );
            }, reminderInterval * 60 * 1000);

            return () => clearInterval(interval);
        }
    };
    return {
        permission,
        requestPermission,
        sendNotification,
        scheduleReminder,
        reminderInterval,
        setReminderInterval,
    };
};