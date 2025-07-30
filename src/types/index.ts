import type { LucideIcon } from 'lucide-react';

export interface Activity {
  id: string;
  name: string;
  completed: boolean;
  icon: LucideIcon;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  score: number;
  activities: {
    id: string;
    name: string;
    completed: boolean;
  }[];
}
