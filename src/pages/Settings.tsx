import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Save,
  Download,
  Upload,
  RotateCcw,
  Gift,
  Trophy,
  Star,
  Globe,
} from "lucide-react";
import { useHabitTracker, RewardSettings } from "../hooks/useHabitTracker";
import LanguageSelector from "../components/LanguageSelector";
import SEO from "../components/SEO";

const Settings = () => {
  const { t } = useTranslation();
  const { rewards, updateRewards, exportData, importData, resetHabit } =
    useHabitTracker();

  const [localRewards, setLocalRewards] = useState<RewardSettings>(rewards);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSaveRewards = () => {
    updateRewards(localRewards);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          importData(data);
          setLocalRewards(data.rewards || rewards);
        } catch (error) {
          console.error("Error importing data:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    resetHabit();
    setLocalRewards({
      daily: "",
      weekly: "",
      final: "",
    });
    setShowResetModal(false);
  };

  // SEO content based on current language
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const seoTitle =
    currentLanguage === "es"
      ? "Configuración - 21 Días Hábito Tracker"
      : "Settings - 21 Days Habit Tracker";
  const seoDescription =
    currentLanguage === "es"
      ? "Personaliza tu experiencia de seguimiento de hábitos. Configura recompensas, exporta datos y ajusta preferencias en tu aplicación de 21 días."
      : "Customize your habit tracking experience. Set up rewards, export data, and adjust preferences in your 21-day habit tracker app.";

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        url="https://21days.deeme.dev/settings"
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <header className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t("settings.title")}
            </h1>
            <p className="text-gray-600">
              {t("settings.subtitle")}
            </p>
          </header>

          {/* Reward System */}
          <section
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            aria-labelledby="rewards-section"
          >
            <header className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-green-600" aria-hidden="true" />
              <h2
                className="text-lg font-semibold text-gray-900"
                id="rewards-section"
              >
                {t("settings.rewards.title")}
              </h2>
            </header>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="daily-reward"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Trophy className="w-4 h-4 inline mr-1" aria-hidden="true" />
                  {t("settings.rewards.daily.title")}
                </label>
                <input
                  id="daily-reward"
                  type="text"
                  value={localRewards.daily}
                  onChange={(e) =>
                    setLocalRewards({ ...localRewards, daily: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("settings.rewards.daily.placeholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="weekly-reward"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Star className="w-4 h-4 inline mr-1" aria-hidden="true" />
                  {t("settings.rewards.weekly.title")}
                </label>
                <input
                  id="weekly-reward"
                  type="text"
                  value={localRewards.weekly}
                  onChange={(e) =>
                    setLocalRewards({ ...localRewards, weekly: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("settings.rewards.weekly.placeholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="final-reward"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Gift className="w-4 h-4 inline mr-1" aria-hidden="true" />
                  {t("settings.rewards.final.title")}
                </label>
                <input
                  id="final-reward"
                  type="text"
                  value={localRewards.final}
                  onChange={(e) =>
                    setLocalRewards({ ...localRewards, final: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("settings.rewards.final.placeholder")}
                />
              </div>

              <button
                onClick={handleSaveRewards}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {t("settings.rewards.save")}
              </button>

              {showSaveMessage && (
                <div className="text-green-600 text-sm text-center font-medium">
                  {t("settings.rewards.saved")}
                </div>
              )}
            </div>
          </section>

          {/* Language Settings */}
          <section
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            aria-labelledby="language-section"
          >
            <header className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <h2
                className="text-lg font-semibold text-gray-900"
                id="language-section"
              >
                {t("settings.language.title")}
              </h2>
            </header>
            <LanguageSelector />
          </section>

          {/* Data Management */}
          <section
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            aria-labelledby="data-section"
          >
            <header className="flex items-center gap-2 mb-4">
              <Download
                className="w-5 h-5 text-purple-600"
                aria-hidden="true"
              />
              <h2
                className="text-lg font-semibold text-gray-900"
                id="data-section"
              >
                {t("settings.data.title")}
              </h2>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={exportData}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                {t("settings.data.export")}
              </button>

              <label className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                {t("settings.data.import")}
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </label>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-md font-medium text-gray-900 mb-2">
                {t("settings.data.resetTitle")}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {t("settings.data.resetDescription")}
              </p>
              <button
                onClick={() => setShowResetModal(true)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {t("settings.data.resetButton")}
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("settings.data.resetTitle")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("settings.data.resetConfirm")}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {t("common.cancel")}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {t("settings.data.resetButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
