import { ReadingList } from "@/components/dashboard/Home/ReadingList";
import { RecentlyRead } from "@/components/dashboard/Home/RecentlyRead";
import { ShortcutGroup } from "@/components/dashboard/Home/ShortcutGroup";
import { Heading } from "@chakra-ui/react";

export default async function ProtectedPage() {
  // const supabase = createClient();
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }

  return (
    <div className="flex-1 w-full flex flex-col items-center text-gray-800">
      <ShortcutGroup />
      <div className="w-full h-full flex flex-col bg-gray-50 space-y-12 p-6">
        <ReadingList />
        <RecentlyRead />
      </div>
    </div>
  );
}
