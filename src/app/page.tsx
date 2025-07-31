import RegistrationForm from '@/components/RegistrationForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl rounded-3xl">
          <CardHeader className="text-center space-y-2 pt-8">
            <h1 className="text-4xl font-black tracking-tighter text-gray-800">Nestle</h1>
            <CardDescription className="text-base text-gray-500">Dummy Tagline</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <RegistrationForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
