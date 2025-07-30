"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, getDoc, updateDoc, increment, collection, writeBatch } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/types';

const formSchema = z.object({
  userUrl: z.string().url({ message: 'Please enter a valid URL.' }),
});

const LEVELS = ["Baby Wazer", "Wazer", "Royal Wazer", "King Wazer", "Ultimate Wazer"];

const POINTS_PER_ACTIVITY = 10;

export default function ScannerForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userUrl: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const url = new URL(values.userUrl);
      const pathSegments = url.pathname.split('/').filter(Boolean);
      const userId = pathSegments[pathSegments.length - 1];

      if (!userId) {
        throw new Error("Could not extract user ID from URL.");
      }

      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        throw new Error("Participant not found.");
      }
      
      const user = userDocSnap.data() as Omit<User, 'id'>;
      const newScore = user.score + POINTS_PER_ACTIVITY;
      
      // Update level based on score
      const newLevelIndex = Math.min(
        Math.floor(newScore / POINTS_PER_ACTIVITY),
        LEVELS.length - 1
      );
      const newLevel = LEVELS[newLevelIndex];

      await updateDoc(userDocRef, {
        score: increment(POINTS_PER_ACTIVITY),
        level: newLevel,
      });

      toast({
        title: "Success!",
        description: `Awarded 10 points to ${user.fullName}. New score: ${newScore}`,
      });

      form.reset(); // Reset form for the next scan
    } catch (error: any) {
      console.error('Error updating document: ', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update score. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participant URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Scan QR code to populate URL" 
                  {...field} 
                  autoFocus 
                  onInput={() => {
                    // This is a workaround to trigger form submission on some scanners
                    // that paste text and then fire an 'input' event but not a 'submit' event.
                    setTimeout(() => {
                      if (form.getValues("userUrl")) {
                        form.handleSubmit(onSubmit)();
                      }
                    }, 100);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full !mt-6" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Award Points'}
        </Button>
      </form>
    </Form>
  );
}
