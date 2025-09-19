import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tight text-primary">404</h1>
        <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>
        <p className="max-w-md text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
