import AcmeLogo from '@/src/components/acme-logo/acme-logo';
import LoginForm from '@/src/components/login-form/login-form';
import { Suspense } from 'react';
 
export default function LoginPage(): React.ReactNode {

  // email: user@nextmail.com
  // password: 123456

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}