"use client";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

type WelcomeScreenProps = {
    onStart: () => void;
    userName: string;
}

export default function WelcomeScreen({ onStart, userName }: WelcomeScreenProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-sm mx-auto">
            <Card className="bg-transparent border-0 shadow-none">
                <CardContent className="p-0">
                    <div className="aspect-[9/16] bg-gradient-to-br from-purple-500 via-blue-500 to-yellow-400 rounded-3xl flex flex-col justify-between items-center text-center p-8 text-white">
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter">Galaxy FEST</h1>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold">Congratulations, {userName}!</h2>
                            <p className="text-lg opacity-80">You are now a Galaxy Gang, let's explore the Galaxy A World.</p>
                            <Button
                                onClick={onStart}
                                className="bg-white text-blue-600 hover:bg-white/90 rounded-full px-10 py-6 text-lg font-bold"
                            >
                                Start
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </main>
  );
}
