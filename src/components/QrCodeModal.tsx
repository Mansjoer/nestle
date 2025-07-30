"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { QrCode, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Skeleton } from './ui/skeleton';

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
        <Button variant="outline" className="rounded-full w-full">
          <QrCode className="mr-2 h-4 w-4" /> Show My Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline">Your Unique QR Code</DialogTitle>
          <DialogDescription>
            A staff member can scan this code to verify your progress.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4">
          {qrCodeUrl ? (
            <Image
              src={qrCodeUrl}
              alt="User QR Code"
              width={256}
              height={256}
              className="rounded-lg shadow-md"
              data-ai-hint="qr code"
            />
          ) : (
            <Skeleton className="w-64 h-64 rounded-lg" />
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
