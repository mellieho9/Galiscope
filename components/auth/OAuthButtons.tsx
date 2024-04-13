import { LoginWithGithub, LoginWithGoogle } from "@/utils/supabase/oauth";
import { Button, VStack, Image } from "@chakra-ui/react";
import { OAuthButton } from "./OAuthButton";

export function OAuthButtons() {
  return (
    <VStack spacing={2}>
      <OAuthButton
        src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png"
        handleClick={LoginWithGoogle}
      >
        Continue with Google
      </OAuthButton>
      <OAuthButton
        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        handleClick={LoginWithGithub}
      >
        Continue with Github
      </OAuthButton>
    </VStack>
  );
}
