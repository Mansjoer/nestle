import type { Activity } from '@/types';
import { Award, Camera, ClipboardCheck, Map, MessageCircle, Puzzle, Gamepad2 } from 'lucide-react';

export const ALL_ACTIVITIES: Omit<Activity, 'completed'>[] = [
  { id: 'booth1', name: 'Galaxy Experience Booth 1', icon: Camera },
  { id: 'booth2', name: 'Galaxy Experience Booth 2', icon: Gamepad2 },
  { id: 'booth3', name: 'Galaxy Experience Booth 3', icon: Puzzle },
  { id: 'booth4', name: 'Galaxy Experience Booth 4', icon: Award },
  { id: 'booth5', name: 'Galaxy Experience Booth 5', icon: Map },
];
