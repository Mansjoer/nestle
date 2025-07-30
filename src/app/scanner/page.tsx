import ScannerForm from '@/components/ScannerForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ScannerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl rounded-3xl">
          <CardHeader className="text-center space-y-2 pt-8">
            <CardTitle className="text-4xl font-black tracking-tighter text-gray-800">Scan Participant Code</CardTitle>
            <CardDescription className="text-base text-gray-500">Scan a participant's QR code to award them points.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <ScannerForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
