import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Settings, BookOpen, Moon, Sun } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useTheme } from "../hooks/useTheme";

const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    {
      path: "/",
      label: t("navigation.home"),
      icon: Home,
    },
    {
      path: "/settings",
      label: t("navigation.settings"),
      icon: Settings,
    },
    {
      path: "/theory",
      label: t("navigation.theory"),
      icon: BookOpen,
    },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("home.title")}
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label={
                theme === "dark"
                  ? t("navigation.lightMode")
                  : t("navigation.darkMode")
              }
              title={
                theme === "dark"
                  ? t("navigation.lightMode")
                  : t("navigation.darkMode")
              }
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <LanguageSelector />
          </div>
        </div>
        <div className="md:hidden pb-3">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
