"use client";

import { Button } from "./ui/button";

type WelcomeScreenProps = {
    onStart: () => void;
    userName: string;
}

export default function WelcomeScreen({ onStart, userName }: WelcomeScreenProps) {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-purple-500 via-blue-500 to-yellow-400 flex flex-col justify-between items-center text-center p-8 text-white">
        <div>
            <h1 className="text-5xl font-black tracking-tighter">Dummy Title</h1>
        </div>
        <div className="space-y-4">
            <h2 className="text-3xl font-bold">Congratulations, {userName}!</h2>
            <p className="text-lg opacity-80">This is some dummy text for the welcome screen.</p>
            <Button
                onClick={onStart}
                className="bg-white text-blue-600 hover:bg-white/90 rounded-full px-10 py-6 text-lg font-bold"
            >
                Start
            </Button>
        </div>
        {/* Empty div for spacing */}
        <div /> 
    </main>
  );
}
