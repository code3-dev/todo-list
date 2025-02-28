import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmDialogProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Full screen overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog content */}
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md transform transition-all duration-200 ease-out scale-100">
          <div className="relative">
            {/* Header with icon */}
            <div className="pt-6 px-6 pb-0 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500 dark:text-red-400" />
              </div>
            </div>
            
            {/* Content */}
            <div className="px-6 pt-4 pb-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                {message}
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-center gap-2 sm:gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  {t('confirm')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}