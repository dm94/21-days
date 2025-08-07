import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, BellOff, Clock } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

interface NotificationSettingsProps {
  className?: string;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { 
    permission, 
    isSupported, 
    requestPermission, 
    sendMotivation,
    scheduleDailyReminder 
  } = useNotifications();

  const handleEnableNotifications = async () => {
    const result = await requestPermission();
    if (result === 'granted') {
      // Schedule daily reminders at 8 PM
      scheduleDailyReminder(20);
    }
  };

  const handleTestNotification = () => {
    sendMotivation();
  };

  if (!isSupported) {
    return (
      <div className={`bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-3">
          <BellOff className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
              {t('settings.notifications.notSupported.title')}
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              {t('settings.notifications.notSupported.description')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('settings.notifications.title')}
        </h3>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {t('settings.notifications.description')}
      </p>

      <div className="space-y-4">
        {/* Permission Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              permission === 'granted' 
                ? 'bg-green-500' 
                : permission === 'denied' 
                  ? 'bg-red-500' 
                  : 'bg-yellow-500'
            }`} />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {t('settings.notifications.status.title')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t(`settings.notifications.status.${permission}`)}
              </p>
            </div>
          </div>
          
          {permission !== 'granted' && (
            <button
              onClick={handleEnableNotifications}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              {t('settings.notifications.enable')}
            </button>
          )}
        </div>

        {/* Daily Reminders */}
        {permission === 'granted' && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <h4 className="font-medium text-gray-900 dark:text-white">
                {t('settings.notifications.dailyReminders.title')}
              </h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {t('settings.notifications.dailyReminders.description')}
            </p>
            <button
              onClick={handleTestNotification}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200 text-sm"
            >
              {t('settings.notifications.testNotification')}
            </button>
          </div>
        )}

        {/* Features List */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 dark:text-white">
            {t('settings.notifications.features.title')}
          </h4>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              {t('settings.notifications.features.dailyReminders')}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              {t('settings.notifications.features.milestones')}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              {t('settings.notifications.features.motivation')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;