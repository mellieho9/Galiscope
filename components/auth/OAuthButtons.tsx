import {
  Button,
  VStack,
  Image,
} from "@chakra-ui/react";

export function OAuthButtons() {
  return (
        
        <VStack spacing={2}> 
        <Button
          leftIcon={
            <Image
              src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png"
              boxSize="1rem"
            />
          }
          borderColor="gray.200"
          variant="outline"
          w="sm"
          bg="white"
          shadow="sm"
          spinnerPlacement='start'
          mt={5}
        >
          Continue with Google
        </Button>
        <Button
          leftIcon={
            <Image
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              boxSize="1rem"
            />
          }
          borderColor="gray.200"
          variant="outline"
          w="sm"
          bg="white"
          spinnerPlacement='start'
          shadow="sm"
        >
          Continue with Github
        </Button>
        </VStack>
  );
}
