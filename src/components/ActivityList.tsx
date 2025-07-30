"use client";

import type { Activity } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type ActivityListProps = {
  activities: Activity[];
  onActivityToggle: (activityId: string, completed: boolean) => void;
};

export default function ActivityList({ activities, onActivityToggle }: ActivityListProps) {
  return (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold font-headline text-center">Activity Checklist</h3>
        <div className="space-y-3">
        {activities.map((activity) => (
            <Card key={activity.id} className="transition-all hover:shadow-md">
            <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                <div className="flex-1">
                    <Label
                    htmlFor={activity.id}
                    className="flex items-center space-x-3 cursor-pointer"
                    >
                    <activity.icon className={`w-8 h-8 flex-shrink-0 transition-colors ${activity.completed ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-base font-medium transition-colors ${activity.completed ? 'text-foreground line-through' : 'text-foreground'}`}>
                        {activity.name}
                    </span>
                    </Label>
                </div>
                <Checkbox
                    id={activity.id}
                    checked={activity.completed}
                    onCheckedChange={(checked) => onActivityToggle(activity.id, !!checked)}
                    className="w-6 h-6"
                />
                </div>
            </CardContent>
            </Card>
        ))}
        </div>
    </div>
  );
}
