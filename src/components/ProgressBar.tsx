import { useTranslation } from 'react-i18next';

interface ProgressBarProps {
  total: number;
  completed: number;
}

export function ProgressBar({ total, completed }: ProgressBarProps) {
  const { t } = useTranslation();
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">{t('taskProgress')}</span>
        <span className="font-medium text-gray-700 dark:text-gray-300">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
        <span>{completed} {t('completed')}</span>
        <span>{total} {t('total')}</span>
      </div>
    </div>
  );
}