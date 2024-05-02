import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button className="flex hover:opacity-75 items-center" onClick={() => router.back()}>
      <ArrowLeftIcon className="w-4 h-4 mr-2" />
      <span className="text-xs">Back</span>
    </button>
  );
};
