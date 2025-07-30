"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Ghost, CircleUser, Bot, Crown, Star } from "lucide-react";

type ProgressTrackerProps = {
  value: number;
};

const icons = [
    { component: Ghost, left: '0%' },
    { component: CircleUser, left: '20%' },
    { component: Bot, left: '50%' },
    { component: Crown, left: '80%' },
    { component: Star, left: '100%' },
];


export default function ProgressTracker({ value }: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress change
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-4 text-center">
      <div className="relative h-8 w-full">
         {icons.map((Icon, index) => {
            const IconComp = Icon.component;
            const isActive = progress >= (parseInt(Icon.left) || 0);
            return (
                 <IconComp key={index} className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 transition-colors ${isActive ? 'text-primary' : 'text-gray-300'}`} style={{ left: Icon.left, transform: `translateX(-50%) translateY(-50%)` }} />
            )
         })}
      </div>
      <Progress value={progress} className="w-full h-2 transition-all duration-500 ease-out" />
      <p className="text-xs text-gray-500">Counting your first miles...</p>
    </div>
  );
}
