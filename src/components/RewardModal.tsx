import { useTranslation } from 'react-i18next';
import { X, Gift, Trophy, Star } from 'lucide-react';
import { RewardSettings } from '../hooks/useHabitTracker';

interface RewardModalProps {
  type: 'daily' | 'weekly' | 'final' | null;
  rewards: RewardSettings;
  onClose: () => void;
}

const RewardModal = ({ type, rewards, onClose }: RewardModalProps) => {
  const { t } = useTranslation();

  if (!type) return null;

  const getRewardConfig = () => {
    switch (type) {
      case 'daily':
        return {
          icon: Gift,
          title: t('rewards.daily.title'),
          message: t('rewards.daily.message'),
          reward: rewards.daily || t('rewards.daily.default'),
          bgColor: 'bg-green-50',
          iconColor: 'text-green-600',
          buttonColor: 'bg-green-600 hover:bg-green-700',
        };
      case 'weekly':
        return {
          icon: Trophy,
          title: t('rewards.weekly.title'),
          message: t('rewards.weekly.message'),
          reward: rewards.weekly || t('rewards.weekly.default'),
          bgColor: 'bg-blue-50',
          iconColor: 'text-blue-600',
          buttonColor: 'bg-blue-600 hover:bg-blue-700',
        };
      case 'final':
        return {
          icon: Star,
          title: t('rewards.final.title'),
          message: t('rewards.final.message'),
          reward: rewards.final || t('rewards.final.default'),
          bgColor: 'bg-yellow-50',
          iconColor: 'text-yellow-600',
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
        };
      default:
        return null;
    }
  };

  const config = getRewardConfig();
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        <div className={`${config.bgColor} px-6 py-4 rounded-t-lg relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-white ${config.iconColor}`}>
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {config.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-gray-600 mb-4">
            {config.message}
          </p>
          
          {config.reward && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Tu recompensa:</h3>
              <p className="text-gray-700 italic">"{config.reward}"</p>
            </div>
          )}

          {/* Celebration Animation */}
          <div className="text-center py-4">
            <div className="text-4xl animate-bounce">
              {type === 'daily' && '🎉'}
              {type === 'weekly' && '🏆'}
              {type === 'final' && '⭐'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${config.buttonColor}`}
          >
            {t('rewards.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardModal;