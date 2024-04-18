import { ReadingList } from "@/components/dashboard/Home/ReadingList";
import { RecentlyRead } from "@/components/dashboard/Home/RecentlyRead";
import { ShortcutGroup } from "@/components/dashboard/Home/ShortcutGroup";

export default async function ProtectedPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center text-gray-800">
      <ShortcutGroup />
      <div className="w-full h-full flex flex-col bg-gray-50 space-y-12 p-6">
        <ReadingList />
        <RecentlyRead />
      </div>
    </div>
  );
}
