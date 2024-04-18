import { CardGrid } from '@/components/dashboard/FolderView/CardGrid';
import { FolderHeading } from '@/components/dashboard/FolderView/FolderHeading';

export default async function FolderPage({
  params: { folderId },
}: {
  params: { folderId: string };
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center text-gray-800">
      <FolderHeading folderId={folderId} />
      <div className="w-full h-full flex flex-col bg-gray-50 space-y-12 p-6">
        <CardGrid folderId={folderId} />
      </div>
    </div>
  );
}
