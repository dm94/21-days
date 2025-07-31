import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Download, Upload, RotateCcw, Gift, Trophy, Star, Globe } from 'lucide-react';
import { useHabitTracker, RewardSettings } from '../hooks/useHabitTracker';
import LanguageSelector from '../components/LanguageSelector';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { rewards, updateRewards, exportData, importData, resetHabit } = useHabitTracker();
  
  const [localRewards, setLocalRewards] = useState<RewardSettings>(rewards);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveRewards = () => {
    updateRewards(localRewards);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `21-days-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = importData(content);
      if (success) {
        setLocalRewards(rewards);
        alert(t('common.success'));
      } else {
        alert(t('common.error'));
      }
    };
    reader.readAsText(file);
  };

  const handleResetAll = () => {
    resetHabit();
    setLocalRewards({ daily: '', weekly: '', final: '' });
    updateRewards({ daily: '', weekly: '', final: '' });
    setShowResetConfirm(false);
  };

  const getCurrentLanguageName = () => {
    return i18n.language === 'es' ? 'Español' : 'English';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('settings.title')}
          </h1>
          <p className="text-gray-600">
            Personaliza tu experiencia y configura tus recompensas
          </p>
        </div>

        {/* Reward System */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t('settings.rewards.title')}
            </h2>
          </div>
          
          <div className="space-y-4">
            {/* Daily Reward */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Gift className="w-4 h-4 text-green-500" />
                {t('settings.rewards.daily.title')}
              </label>
              <input
                type="text"
                value={localRewards.daily}
                onChange={(e) => setLocalRewards({ ...localRewards, daily: e.target.value })}
                placeholder={t('settings.rewards.daily.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Weekly Reward */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Trophy className="w-4 h-4 text-blue-500" />
                {t('settings.rewards.weekly.title')}
              </label>
              <input
                type="text"
                value={localRewards.weekly}
                onChange={(e) => setLocalRewards({ ...localRewards, weekly: e.target.value })}
                placeholder={t('settings.rewards.weekly.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Final Reward */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                {t('settings.rewards.monthly.title')}
              </label>
              <input
                type="text"
                value={localRewards.final}
                onChange={(e) => setLocalRewards({ ...localRewards, final: e.target.value })}
                placeholder={t('settings.rewards.monthly.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={handleSaveRewards}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                {t('settings.rewards.save')}
              </button>
              
              {showSaveSuccess && (
                <span className="ml-3 text-green-600 font-medium">
                  {t('settings.rewards.saved')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t('settings.language.title')}
            </h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                {t('settings.language.current', { language: getCurrentLanguageName() })}
              </p>
            </div>
            <LanguageSelector />
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('settings.data.title')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Export Data */}
            <button
              onClick={handleExportData}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              {t('settings.data.export')}
            </button>

            {/* Import Data */}
            <label className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              {t('settings.data.import')}
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>

            {/* Reset All */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t('settings.data.reset')}
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('settings.data.reset')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('settings.data.resetConfirm')}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleResetAll}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {t('common.confirm')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;