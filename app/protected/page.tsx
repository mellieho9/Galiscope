import { ShortcutGroup } from "@/components/dashboard/Home/ShortcutGroup";
import { Divider, Heading } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }

  return (
    <div className="flex-1 w-full flex flex-col items-center text-gray-800">
      <div className="w-full justify-start p-6 border-b border-gray-200">
        <Heading size="sm">Home</Heading>
      </div>
      <ShortcutGroup />
    </div>
  );
}
