"use client";

import { useState, useMemo } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User, Activity } from '@/types';
import { ALL_ACTIVITIES } from '@/lib/activities';
import ProgressTracker from './ProgressTracker';
import ActivityList from './ActivityList';
import QrCodeModal from './QrCodeModal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Puzzle } from 'lucide-react';

type EventDashboardProps = {
  initialUser: User;
};

export default function EventDashboard({ initialUser }: EventDashboardProps) {
  const { toast } = useToast();
  const [user, setUser] = useState<User>(initialUser);

  const activitiesWithIcons = useMemo(() => {
    return user.activities.map(userActivity => {
      const masterActivity = ALL_ACTIVITIES.find(a => a.id === userActivity.id);
      return {
        ...userActivity,
        icon: masterActivity?.icon || Puzzle, // Fallback icon
      };
    });
  }, [user.activities]);
  
  const [activities, setActivities] = useState<Activity[]>(activitiesWithIcons);

  const handleActivityToggle = async (activityId: string, completed: boolean) => {
    const updatedActivities = activities.map(activity =>
      activity.id === activityId ? { ...activity, completed } : activity
    );

    const newScore = updatedActivities.filter(a => a.completed).length;

    setActivities(updatedActivities);
    setUser(prevUser => ({ ...prevUser, score: newScore }));

    try {
      const userDocRef = doc(db, 'users', user.id);
      await updateDoc(userDocRef, {
        score: newScore,
        activities: updatedActivities.map(({ icon, ...rest }) => rest),
      });
    } catch (error) {
      console.error("Error updating user progress:", error);
      toast({
        title: "Error",
        description: "Could not save your progress. Please refresh and try again.",
        variant: "destructive",
      });
      // Revert state on error
      setActivities(activities);
      setUser(user);
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b border-border p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold font-headline text-primary">
            Welcome, {user.fullName}!
          </h1>
          <QrCodeModal userId={user.id} />
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-8">
        <div className="w-full max-w-2xl mx-auto">
          <Card className="shadow-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Your Progress</CardTitle>
              <CardDescription>Complete activities to boost your score.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <ProgressTracker score={user.score} total={activities.length} />
              <ActivityList activities={activities} onActivityToggle={handleActivityToggle} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
