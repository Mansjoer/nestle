import type { Activity } from '@/types';
import { Award, Camera, ClipboardCheck, Map, MessageCircle, Puzzle, Gamepad2 } from 'lucide-react';

export const ALL_ACTIVITIES: Omit<Activity, 'completed'>[] = [
  { id: 'award', name: 'Win a Mini-Game', icon: Award },
  { id: 'camera', name: 'Photo Booth Session', icon: Camera },
  { id: 'clipboard', name: 'Complete the Survey', icon: ClipboardCheck },
  { id: 'map', name: 'Visit all Booths', icon: Map },
  { id: 'feedback', name: 'Leave a Feedback Note', icon: MessageCircle },
  { id: 'puzzle', name: 'Solve the Brain Teaser', icon: Puzzle },
  { id: 'game', name: 'Play an Arcade Game', icon: Gamepad2 },
];
