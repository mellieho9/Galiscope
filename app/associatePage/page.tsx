'use client';

import CustomButton from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex bg-gray-50 text-gray-500 items-center justify-center p-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold mb-6">404</h1>
        <h1 className="text-md font-bold">Paper not found</h1>
        <p className="text-sm mb-6">
          Oops! The paper you are looking for does not exist.
        </p>
        <CustomButton
          width={'2xs'}
          onClick={() => router.push('/dashboard')}
        >
          Go Home
        </CustomButton>
      </div>
    </div>
  );
}
