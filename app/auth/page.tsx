"use client"
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { Center, Flex, VStack } from "@chakra-ui/react";
import { CustomTab } from "@/components/auth/Tab";
import { GoogleAuth } from "@/components/auth/GoogleAuth";


export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
//   const signIn = async (formData: FormData) => {
//     "use server";

//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const supabase = createClient();

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       return redirect("/login?message=Could not authenticate user");
//     }

//     return redirect("/protected");
//   };

//   const signUp = async (formData: FormData) => {
//     "use server";

//     const origin = headers().get("origin");
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const supabase = createClient();

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: `${origin}/auth/callback`,
//       },
//     });

//     if (error) {
//       return redirect("/login?message=Could not authenticate user");
//     }

//     return redirect("/login?message=Check email to continue sign in process");
//   };

  return (
    <Center bg="white" h="100vh" w="100vw" >
        <VStack w="100%">
      {/* icon  */}
        {/* tabs  */}
        <CustomTab />
        {/* google auth  */}
        <GoogleAuth />
        {/* term and services */}
        </VStack>
  </Center>
  );

}
