export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type Theme = 'dark' | 'light';
export type Language = 'en' | 'fa';