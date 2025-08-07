import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type NotificationPermission = 'default' | 'granted' | 'denied';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
}

export function useNotifications() {
  const { t } = useTranslation();
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'default'
  );

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return 'denied';
    }

    if (permission === 'granted') {
      return 'granted';
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }, [permission]);

  const sendNotification = useCallback(
    (options: NotificationOptions) => {
      if (permission !== 'granted') {
        console.warn('Notification permission not granted');
        return null;
      }

      try {
        const notification = new Notification(options.title, {
          body: options.body,
          icon: options.icon || '/favicon.svg',
          tag: options.tag || 'habit-tracker',
          requireInteraction: false,
        });

        // Auto close after 5 seconds
        setTimeout(() => {
          notification.close();
        }, 5000);

        return notification;
      } catch (error) {
        console.error('Error sending notification:', error);
        return null;
      }
    },
    [permission]
  );

  const sendHabitReminder = useCallback(() => {
    sendNotification({
      title: t('notifications.reminder.title'),
      body: t('notifications.reminder.body'),
      tag: 'habit-reminder',
    });
  }, [sendNotification, t]);

  const sendCongratulations = useCallback((day: number) => {
    let messageKey = 'notifications.congratulations.daily';
    
    if (day === 21) {
      messageKey = 'notifications.congratulations.final';
    } else if (day % 7 === 0) {
      messageKey = 'notifications.congratulations.weekly';
    }

    sendNotification({
      title: t('notifications.congratulations.title'),
      body: t(messageKey, { day }),
      tag: 'habit-congratulations',
    });
  }, [sendNotification, t]);

  const sendMotivation = useCallback(() => {
    const motivationMessages = [
      'notifications.motivation.message1',
      'notifications.motivation.message2',
      'notifications.motivation.message3',
      'notifications.motivation.message4',
    ];
    
    const randomMessage = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];
    
    sendNotification({
      title: t('notifications.motivation.title'),
      body: t(randomMessage),
      tag: 'habit-motivation',
    });
  }, [sendNotification, t]);

  // Schedule daily reminder
  const scheduleDailyReminder = useCallback((hour: number = 20) => {
    if (permission !== 'granted') return;

    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hour, 0, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    setTimeout(() => {
      sendHabitReminder();
      // Schedule next day's reminder
      scheduleDailyReminder(hour);
    }, timeUntilReminder);
  }, [permission, sendHabitReminder]);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  return {
    permission,
    isSupported: 'Notification' in window,
    requestPermission,
    sendNotification,
    sendHabitReminder,
    sendCongratulations,
    sendMotivation,
    scheduleDailyReminder,
  };
}