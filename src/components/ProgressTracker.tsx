"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Ghost, CircleUser, Bot, Crown, Star } from "lucide-react";

type ProgressTrackerProps = {
  value: number;
};

const icons = [
    { component: Ghost, left: '0%' },
    { component: CircleUser, left: '25%' },
    { component: Bot, left: '50%' },
    { component: Crown, left: '75%' },
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
            const leftPosition = parseInt(Icon.left);
            // Special handling for the last icon to align it to the very end
            const transform = leftPosition === 100 ? 'translateX(-100%) translateY(-50%)' : 'translateX(-50%) translateY(-50%)';

            return (
                 <IconComp key={index} className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 transition-colors ${isActive ? 'text-primary' : 'text-gray-300'}`} style={{ left: Icon.left, transform: `translateX(-50%) translateY(-50%)` }} />
            )
         })}
      </div>
      <Progress value={progress} className="w-full h-4 transition-all duration-500 ease-out" />
      <p className="text-xs text-gray-500">Counting your first miles...</p>
    </div>
  );
}
