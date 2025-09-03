// app/auth/register/page.tsx
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Quitado bg-gray-100 */}
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
