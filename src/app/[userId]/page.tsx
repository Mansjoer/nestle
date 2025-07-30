import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase';
import type { User } from '@/types';
import EventDashboard from '@/components/EventDashboard';

type UserPageProps = {
  params: {
    userId: string;
  };
};

async function getUserData(userId: string): Promise<User | null> {
  const userDocRef = doc(db, 'users', userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    return {
      id: userDocSnap.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      score: data.score,
      activities: data.activities,
      level: data.level,
    };
  } else {
    return null;
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserData(params.userId);

  if (!user) {
    notFound();
  }

  return <EventDashboard initialUser={user} />;
}
