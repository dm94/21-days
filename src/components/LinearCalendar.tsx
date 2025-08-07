import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

interface LinearCalendarProps {
  completedDays: boolean[];
  currentDay: number;
}

const LinearCalendar = ({ completedDays, currentDay }: LinearCalendarProps) => {
  const { t } = useTranslation();

  const getDayStatus = (dayIndex: number) => {
    if (completedDays[dayIndex]) return "completed";
    if (dayIndex === currentDay) return "current";
    return "future";
  };

  const getDayClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 dark:bg-green-600 text-white border-green-500 dark:border-green-600";
      case "current":
        return "bg-blue-500 dark:bg-blue-600 text-white border-blue-500 dark:border-blue-600 ring-4 ring-blue-200 dark:ring-blue-400";
      case "future":
        return "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600";
      default:
        return "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t("home.calendar.title")}
      </h3>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {Array.from({ length: 21 }, (_, index) => {
          const dayNumber = index + 1;
          const status = getDayStatus(index);

          return (
            <div
              key={index}
              className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300 ${getDayClasses(
                status
              )}`}
              title={`${t("home.calendar.dayCompleted")} ${dayNumber}`}
            >
              {status === "completed" ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{dayNumber}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 dark:bg-green-600"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {t("home.calendar.dayCompleted")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-600 ring-2 ring-blue-200 dark:ring-blue-400"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {t("home.calendar.currentDay")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {t("home.calendar.futureDay")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LinearCalendar;
