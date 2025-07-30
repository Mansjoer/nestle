"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/types';

const formSchema = z.object({
  userId: z.string().min(1, { message: 'Please enter a valid participant code.' }),
});

const LEVELS = ["Baby Wazer", "Wazer", "Royal Wazer", "King Wazer", "Ultimate Wazer"];

const POINTS_PER_ACTIVITY = 20;

export default function ScannerForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const userId = values.userId.trim();

      if (!userId) {
        throw new Error("Participant code cannot be empty.");
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
        description: `Awarded ${POINTS_PER_ACTIVITY} points to ${user.fullName}. New score: ${newScore}`,
      });

      form.reset();
    } catch (error: any) {
      console.error('Error updating document: ', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update score. Please check the code and try again.",
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
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participant Code</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Scan QR code or enter code" 
                  {...field} 
                  autoFocus
                  onInput={() => {
                    // This is a workaround to trigger form submission on some scanners
                    // that paste text and then fire an 'input' event but not a 'submit' event.
                    setTimeout(() => {
                      if (form.getValues("userId")) {
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
