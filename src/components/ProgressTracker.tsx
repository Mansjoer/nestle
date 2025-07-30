"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

type ProgressTrackerProps = {
  score: number;
  total: number;
};

export default function ProgressTracker({ score, total }: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const percentage = total > 0 ? (score / total) * 100 : 0;
    // Delay setting progress to allow for animation
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [score, total]);


  return (
    <div className="space-y-3 text-center">
      <div className="text-2xl font-bold font-headline">
        <span className="text-primary">{score}</span> / {total} Activities
      </div>
      <Progress value={progress} className="w-full h-4 transition-all duration-500 ease-out" />
    </div>
  );
}
