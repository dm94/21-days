import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  singleButton?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  confirmButtonClass = "bg-red-600 hover:bg-red-700 text-white",
  singleButton = false,
}: ConfirmationModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 transition-colors duration-300">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>
          {singleButton ? (
            <button
              onClick={onClose}
              className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${confirmButtonClass}`}
            >
              {confirmText || t("common.close")}
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {cancelText || t("common.cancel")}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors ${confirmButtonClass}`}
              >
                {confirmText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;