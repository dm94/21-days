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
        return "bg-green-500 text-white border-green-500";
      case "current":
        return "bg-blue-500 text-white border-blue-500 ring-4 ring-blue-200";
      case "future":
        return "bg-gray-200 text-gray-500 border-gray-300";
      default:
        return "bg-gray-200 text-gray-500 border-gray-300";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
              className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200 ${getDayClasses(
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
      <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">
            {t("home.calendar.dayCompleted")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 ring-2 ring-blue-200"></div>
          <span className="text-sm text-gray-600">
            {t("home.calendar.currentDay")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-200"></div>
          <span className="text-sm text-gray-600">
            {t("home.calendar.futureDay")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LinearCalendar;
