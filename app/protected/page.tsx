"use client";
import GreenThing from "@/components/modals/GreenThing";
import PaperUpload from "@/components/modals/PaperUpload";
import DiagramType from "@/components/modals/DiagramType";

import { Center } from "@chakra-ui/react";
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
    // <GreenThing />
    // <PaperUpload />
    //<DiagramType />

    <div className="absolute top-1/2">
      <DiagramType />
    </div>
  );
}
