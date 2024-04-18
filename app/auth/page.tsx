"use client";

import { useState } from "react";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { Center, Heading, Link, Image, Text, VStack } from "@chakra-ui/react";
import logo from "../../public/logo.svg";
import { BackButton } from "@/components/BackButton";
export default function Index() {
  const [pageView, setPageView] = useState("signup"); // 'signup' or 'login'

  const togglePageView = () => {
    setPageView((prevView) => (prevView === "signup" ? "login" : "signup"));
  };

  return (
    <>
      <Center className="w-full min-h-screen items-center justify-center bg-white">
        <span className="absolute top-5 left-5 z-5">
          <a href="/">
              <BackButton />
          </a>
        </span>
        <VStack spacing={9}>
          <Image src={logo.src} width={100} height={100} />
          <VStack spacing={2}>
            <Heading color="gray.800">
              {pageView === "signup" ? "Sign up" : "Log in"}
            </Heading>
            <Text color="gray.500">To continue using Galiscope</Text>
          </VStack>
          <OAuthButtons />
          {pageView === "signup" ? (
            <Text color="gray.500">
              Have an account?{" "}
              <Link color="teal" onClick={togglePageView}>
                Log in
              </Link>
            </Text>
          ) : (
            <Text color="gray.500">
              Don't have an account?{" "}
              <Link color="teal" onClick={togglePageView}>
                Sign up
              </Link>
            </Text>
          )}
        </VStack>
      </Center>
    </>
  );
}
