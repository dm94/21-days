import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Play, RotateCcw } from "lucide-react";
import { useHabitTracker } from "../hooks/useHabitTracker";
import LinearCalendar from "../components/LinearCalendar";
import RewardModal from "../components/RewardModal";
import Confetti from "../components/Confetti";
import Seo from "../components/SEO";

const Home = () => {
  const { t } = useTranslation();
  const {
    habitData,
    rewards,
    showReward,
    showResetModal,
    startHabit,
    completeDay,
    resetHabit,
    canCompleteToday,
    getDaysRemaining,
    getMotivationalMessage,
    setShowReward,
    setShowResetModal,
  } = useHabitTracker();

  const [showConfetti, setShowConfetti] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getMotivationalText = () => {
    const messageKey = getMotivationalMessage();
    return t(`home.habitStatus.motivationalMessages.${messageKey}`);
  };

  // If no habit started yet
  if (!habitData.startDate) {
    return (
      <>
        <Seo />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section className="text-center">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 transition-colors duration-300">
              <header className="mb-6">
                <Calendar
                  className="w-16 h-16 text-blue-600 mx-auto mb-4"
                  aria-hidden="true"
                />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {t("home.title")}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t("home.subtitle")}
                </p>
              </header>

              <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {getMotivationalText()}
                </p>
              </div>

              <button
                onClick={startHabit}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                {t("home.startJourney")}
              </button>
            </article>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Seo />
      <Confetti isActive={showConfetti} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <section
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center transition-colors duration-300"
            aria-labelledby="day-counter"
          >
            <header className="mb-6">
              <div
                className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                id="day-counter"
              >
                {habitData.currentDay}
              </div>
              <h1 className="text-xl text-gray-600 dark:text-gray-300">
                {t("home.dayCounter", { count: habitData.currentDay })}
              </h1>
            </header>

            {!habitData.isCompleted && (
              <button
                onClick={() => {
                  completeDay();
                  setShowConfetti(true);
                  setTimeout(() => setShowConfetti(false), 3000);
                }}
                disabled={!canCompleteToday()}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full text-lg font-medium transition-all transform ${
                  canCompleteToday()
                    ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white hover:scale-105 shadow-lg"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              >
                <span className="text-2xl">✓</span>
                {t("home.completeTaskButton")}
              </button>
            )}

            {habitData.isCompleted && (
              <div className="text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">
                  {getMotivationalText()}
                </p>
                <button
                  onClick={resetHabit}
                  className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start New Habit
                </button>
              </div>
            )}
          </section>
          <section
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300"
            aria-labelledby="habit-status"
          >
            <h2
              className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              id="habit-status"
            >
              Estado del Hábito
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatDate(habitData.startDate)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t("home.habitStatus.startDate")}
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {habitData.currentDay}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t("home.habitStatus.consecutiveDays")}
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {getDaysRemaining()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t("home.habitStatus.daysRemaining")}
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-center transition-colors duration-300">
              <p className="text-blue-800 dark:text-blue-300 font-medium">
                {getMotivationalText()}
              </p>
            </div>
          </section>
          <section aria-labelledby="progress-calendar">
            <LinearCalendar
              completedDays={habitData.completedDays}
              currentDay={habitData.currentDay}
            />
          </section>
        </div>
      </main>

      {/* Reward Modal */}
      <RewardModal
        type={showReward}
        rewards={rewards}
        onClose={() => setShowReward(null)}
      />

      {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 transition-colors duration-300">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("home.reset.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("home.reset.message")}
              </p>
              <button
                onClick={() => setShowResetModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {t("home.reset.button")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
