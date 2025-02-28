import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLanguage } from './hooks/useLanguage';
import { Todo, Theme } from './types';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { ProgressBar } from './components/ProgressBar';
import { Settings } from './components/Settings';
import { MobileNavigation } from './components/MobileNavigation';
import { Layout } from 'lucide-react';

function App() {
  const { t } = useTranslation();
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');
  const { language, toggleLanguage } = useLanguage();
  const [view, setView] = useState<'home' | 'settings'>('home');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addTodo = (text: string) => {
    setTodos([
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now(),
      },
      ...todos,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };
  
  const deleteAllTodos = () => {
    setTodos([]);
  };


  const handleUpdateTodos = (newTodos: any[]) => {
    setTodos(newTodos);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto p-4 pb-20 md:pb-8 md:pt-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Layout className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              {t('appTitle')}
            </h1>
          </div>
        </div>

        <div className="md:grid md:grid-cols-[1fr,350px] md:gap-8">
          {/* Main Content */}
          <div className={view === 'settings' ? 'hidden md:block' : ''}>
            <div className="space-y-8">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10 dark:border-gray-700/30">
                <TodoInput onAdd={addTodo} />
              </div>
              
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10 dark:border-gray-700/30">
                <ProgressBar
                  total={todos.length}
                  completed={completedTodos.length}
                />
              </div>
              
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10 dark:border-gray-700/30">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    {language === 'fa' ? 'وظایف فعال' : 'Active Tasks'} ({activeTodos.length})
                  </h2>
                </div>
                
                <TodoList
                  todos={todos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div
            className={`${
              view === 'home' ? 'hidden md:block' : ''
            } bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10 dark:border-gray-700/30 h-fit`}
          >
            <h2 className="text-xl font-semibold mb-6 hidden md:block">
              {t('settings')}
            </h2>
            <Settings
              theme={theme}
              language={language}
              onThemeToggle={toggleTheme}
              onLanguageToggle={toggleLanguage}
              onClearCompleted={clearCompleted}
              onDeleteAll={deleteAllTodos}
              completedCount={completedTodos.length}
              totalCount={todos.length}
              todos={todos}
              onUpdateTodos={handleUpdateTodos}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation currentView={view} onViewChange={setView} />
    </div>
  );
}

export default App;