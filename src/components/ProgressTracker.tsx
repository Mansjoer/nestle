"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Ghost, CircleUser, Bot, Crown, Star } from "lucide-react";

type ProgressTrackerProps = {
  value: number;
};

const icons = [
    { component: Ghost, threshold: 0 },
    { component: CircleUser, threshold: 20 },
    { component: Bot, threshold: 40 },
    { component: Crown, threshold: 60 },
    { component: Star, threshold: 80 },
];

const iconPositions = ['0%', '25%', '50%', '75%', '100%'];


export default function ProgressTracker({ value }: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress change
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-4 text-center">
      <div className="relative h-8 w-full px-4 mb-4">
         {icons.map((Icon, index) => {
            const IconComp = Icon.component;
            const isActive = progress >= Icon.threshold;
            
            return (
                 <IconComp key={index} className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-300'}`} style={{ left: iconPositions[index], transform: 'translateX(-50%)' }} />
            )
         })}
      </div>
      <Progress value={progress} className="w-full h-4 transition-all duration-500 ease-out" />
      <p className="text-xs text-gray-500">Counting your first miles...</p>
    </div>
  );
}
