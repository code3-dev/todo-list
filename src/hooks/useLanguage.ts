import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from './useLocalStorage';
import { Language } from '../types';

export function useLanguage() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useLocalStorage<Language>('language', 'fa');

  useEffect(() => {
    i18n.changeLanguage(language);
    
    // Set the document direction based on language
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Update the page title based on language
    // document.title = language === 'fa' ? 'مدیریت وظایف' : 'Task Manager';
  }, [language, i18n]);

  const toggleLanguage = () => {
    setLanguage(language === 'fa' ? 'en' : 'fa');
  };

  return { language, toggleLanguage };
}