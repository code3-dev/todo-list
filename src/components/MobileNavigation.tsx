import { Home, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileNavigationProps {
  currentView: 'home' | 'settings';
  onViewChange: (view: 'home' | 'settings') => void;
}

export function MobileNavigation({ currentView, onViewChange }: MobileNavigationProps) {
  const { t } = useTranslation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="flex justify-around p-3">
        <button
          onClick={() => onViewChange('home')}
          className={`flex flex-col items-center gap-1 ${
            currentView === 'home'
              ? 'text-blue-500'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">{t('home')}</span>
        </button>
        <button
          onClick={() => onViewChange('settings')}
          className={`flex flex-col items-center gap-1 ${
            currentView === 'settings'
              ? 'text-blue-500'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs">{t('settingsNav')}</span>
        </button>
      </div>
    </div>
  );
}