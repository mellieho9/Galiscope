import { BackButton } from '@/components/BackButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-white">
      <span className="absolute top-5 left-6 z-50">
        <BackButton />
      </span>
      {children}
    </div>
  );
}
