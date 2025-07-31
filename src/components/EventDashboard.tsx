"use client";

import { useState, useEffect } from 'react';
import type { User } from '@/types';
import ProgressTracker from './ProgressTracker';
import QrCodeModal from './QrCodeModal';
import WelcomeScreen from './WelcomeScreen';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Trophy } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';

type EventDashboardProps = {
  initialUser: User;
};

export default function EventDashboard({ initialUser }: EventDashboardProps) {
  const [user, setUser] = useState<User>(initialUser);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", initialUser.id), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUser({
          id: doc.id,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          score: data.score,
          activities: data.activities,
          level: data.level,
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsub();
  }, [initialUser.id]);
  
  const handleStart = () => {
    setIsWelcomeVisible(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gray-100">
      {/* Welcome Screen */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-500", 
        isWelcomeVisible ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
      )}>
        <WelcomeScreen onStart={handleStart} userName={user.fullName} />
      </div>

      {/* Dashboard Screen */}
      <div className={cn(
          "absolute inset-0 transition-opacity duration-500 delay-300", 
          !isWelcomeVisible ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        )}>
          <div className="min-h-screen bg-accent flex items-center justify-center p-4">
          <main className="w-full">
            <div className="w-full max-w-md mx-auto bg-card rounded-3xl shadow-lg p-6 space-y-6">
                <div className="text-center">
                    <p className="font-bold text-lg text-gray-900">Your level: {user.level}</p>
                    <p className="text-sm text-gray-500">Still calculating your rank</p>
                </div>
              
                <ProgressTracker value={user.score} />

                <div className="space-y-4">
                    <Card className="bg-gray-50 rounded-2xl">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800">Your Points: {user.score}</p>
                                <p className="text-xs text-gray-500">Drive and report to earn points. Learn how else to rack 'em up.</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400" />
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-50 rounded-2xl">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Trophy className="h-6 w-6 text-gray-900" />
                                <div>
                                    <p className="font-bold text-gray-800">About Levels</p>
                                    <p className="text-xs text-gray-500">Advance to get more reporting influence and a customized Wazer.</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400" />
                        </CardContent>
                    </Card>
                </div>
                <div className="pt-4">
                    <QrCodeModal userId={user.id} />
                </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
