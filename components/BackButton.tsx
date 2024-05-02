'use client';
import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export const BackButton = ({ ...props }) => {
  const router = useRouter();

  const handleClick = () => {
    console.log('Back button clicked');
    router.back();
  };

  return (
    <button
      {...props}
      className="p-2 px-3 shadow rounded-full items-center bg-teal text-white text-sm font-semibold flex flex-row shadow hover:bg-white border-teal hover:border-teal hover:text-teal"
      onClick={handleClick}
    >
      <ArrowLeftIcon className="w-4 h-4 mr-2" />
      Back
    </button>
  );
};
