import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { Todo } from '../types';
import { useTranslation } from 'react-i18next';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const { t } = useTranslation();
  
  const handleDelete = (id: string, text: string) => {
    if (window.confirm(t('deleteTaskConfirm', { task: text }))) {
      onDelete(id);
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {t('noTasks')}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50 group hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all"
        >
          <button
            onClick={() => onToggle(todo.id)}
            className={`text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 transition-colors ${
              todo.completed ? 'text-blue-500 dark:text-blue-400' : ''
            }`}
          >
            {todo.completed ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>
          <span
            className={`flex-1 ${
              todo.completed
                ? 'line-through text-gray-400 dark:text-gray-500'
                : 'text-gray-700 dark:text-gray-200'
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => handleDelete(todo.id, todo.text)}
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-all focus:opacity-100"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}