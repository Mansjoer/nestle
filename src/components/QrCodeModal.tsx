"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { QrCode, X, Loader2, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

type QrCodeModalProps = {
  userId: string;
};

export default function QrCodeModal({ userId }: QrCodeModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [userUrl, setUserUrl] = useState('');

  useEffect(() => {
    // This runs only on the client, after the component has mounted.
    // This prevents hydration mismatch errors from using window.location.
    const currentUrl = `${window.location.origin}/${userId}`;
    setUserUrl(currentUrl);
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(currentUrl)}`);
  }, [userId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
            <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <QrCode className="h-6 w-6 text-gray-900" />
                    <div>
                        <p className="font-bold text-gray-800">Show My Code</p>
                    </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
            </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline">Your Unique QR Code</DialogTitle>
          <DialogDescription>
            A staff member can scan this code to verify your progress.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4 h-64">
          {qrCodeUrl ? (
            <Image
              src={qrCodeUrl}
              alt="User QR Code"
              width={256}
              height={256}
              className="shadow-md"
              data-ai-hint="qr code"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
          )}
        </div>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
