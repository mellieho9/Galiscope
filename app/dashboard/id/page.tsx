import { CardGrid } from "@/components/dashboard/FolderView/CardGrid";
import { Heading } from "@/components/dashboard/FolderView/Heading"

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
    <div className="flex min-h-screen w-full flex-col items-center text-gray-800">
      <Heading title="Video captioning" incompleteRead={3} completeRead={4} />
      <div className="w-full h-full flex flex-col bg-gray-50 space-y-12 p-6">
        <CardGrid />
      </div>
    </div>
  );
}
