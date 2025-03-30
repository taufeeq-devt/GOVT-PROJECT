import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SignInOptionsPage() {
  return (
    <div className="flex h-screen">
      {/* Left side - Government template */}
      <div className="w-1/2 bg-gray-100">
        {/* Your government template content here */}
        
      </div>
      
      {/* Right side - Sign-in options */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="mb-8 text-2xl font-bold">Select Account Type</h1>
        
        <div className="space-y-4">
          <Link href="/sign-in/government">
            <Button className="w-64 p-4 bg-blue-600 text-white rounded">
              Sign in as Government
            </Button>
          </Link>
          
          <Link href="/sign-in/supplier">
            <Button className="w-64 p-4 bg-green-600 text-white rounded">
              Sign in as Supplier
            </Button>
          </Link>
          
          <Link href="/sign-in/contractor">
            <Button className="w-64 p-4 bg-orange-600 text-white rounded">
              Sign in as Contractor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}