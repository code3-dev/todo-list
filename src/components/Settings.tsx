import React, { useState } from 'react';
import { Moon, Sun, Trash2, AlertOctagon, Languages, Send, Instagram, Mail, Download, Upload } from 'lucide-react';
import { Theme, Language, Todo } from '../types';
import { ConfirmDialog } from './ConfirmDialog';
import { useTranslation } from 'react-i18next';

interface SettingsProps {
  theme: Theme;
  language: Language;
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
  onClearCompleted: () => void;
  onDeleteAll: () => void;
  completedCount: number;
  totalCount: number;
  todos: Todo[];
  onUpdateTodos: (newTodos: Todo[]) => void;
}

export function Settings({
  theme,
  language,
  onThemeToggle,
  onLanguageToggle,
  onClearCompleted,
  onDeleteAll,
  completedCount,
  totalCount,
  todos,
  onUpdateTodos,
}: SettingsProps) {
  const { t } = useTranslation();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

  const handleExport = () => {
    const todosToExport = JSON.stringify(todos);
    const blob = new Blob([todosToExport], { type: 'application/json' });
    const link = document.createElement('a');
    const time = new Date().toISOString().replace(/[:.]/g, '-');
    link.href = URL.createObjectURL(blob);
    link.download = `todos-${time}.json`;
    link.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const importedData = JSON.parse(reader.result as string);
        const uniqueTodos = [
          ...importedData.filter((importedTodo: Todo) => !todos.some((todo) => todo.id === importedTodo.id)),
          ...todos,
        ];
        onUpdateTodos(uniqueTodos);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          {theme === 'dark' ? (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          ) : (
            <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          )}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {theme === 'dark' ? t('darkMode') : t('lightMode')}
          </span>
        </div>
        <button
          onClick={onThemeToggle}
          className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 relative transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <div
            className={`absolute top-1 ${language === 'fa' ? 'right-1' : 'left-1'} w-4 h-4 rounded-full bg-white transition-transform ${theme === 'dark' ? (language === 'fa' ? 'translate-x-[-1.5rem]' : 'translate-x-6') : ''
              }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <Languages className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {t('language')}
          </span>
        </div>
        <button
          onClick={onLanguageToggle}
          className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          {language === 'fa' ? t('farsi') : t('english')}
        </button>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <div>
              <span className="block font-medium text-gray-700 dark:text-gray-200">
                {t('clearCompleted')}
              </span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                {t('completedTasks', { count: completedCount })}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={completedCount === 0}
            className={`px-3 py-1.5 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${language === 'fa' ? 'mr-2' : ''
              }`}
          >
            {t('clear')}
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-5 h-5 text-red-500 dark:text-red-400" />
            <div>
              <span className="block font-medium text-gray-700 dark:text-gray-200">
                {t('deleteAll')}
              </span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                {t('totalTasks', { count: totalCount })}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowDeleteAllConfirm(true)}
            disabled={totalCount === 0}
            className={`px-3 py-1.5 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${language === 'fa' ? 'mr-2' : ''
              }`}
          >
            {t('deleteAllButton')}
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="import-file"
            className="w-full px-3 py-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <Upload className="w-5 h-5 inline-block" /> {t('import')}
          </label>
          <input
            id="import-file"
            type="file"
            accept="application/json"
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={handleExport}
            className="w-full px-3 py-2 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <Download className="w-5 h-5 inline-block" /> {t('export')}
          </button>
        </div>
      </div>


      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={onClearCompleted}
        title={t('clearCompletedTitle')}
        message={t('clearCompletedMessage', { count: completedCount })}
      />

      <ConfirmDialog
        isOpen={showDeleteAllConfirm}
        onClose={() => setShowDeleteAllConfirm(false)}
        onConfirm={onDeleteAll}
        title={t('deleteAllTitle')}
        message={t('deleteAllMessage', { count: totalCount })}
      />

      <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center">
        <span className="block font-medium text-gray-700 dark:text-gray-200">App Version 1.3.0</span>
      </div>

      <div className="flex justify-center gap-4">
        <a href="https://t.me/h3dev" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600">
          <Send className="w-5 h-5" />
        </a>
        <a href="https://instagram.com/h3dev.pira" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-pink-500 text-white hover:bg-pink-600">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="mailto:h3dev.pira@gmail.com" className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-800">
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}