import {
  AbsoluteCenter,
  Divider,
  Container,
  Flex,
  Button,
  VStack,
  Image
} from "@chakra-ui/react";

export function GoogleAuth() {
  return (
    <Container centerContent w="lg">
      <VStack w="lg" spacing={5}>
        <Container>
          <Divider />
          <Flex position="relative">
            <AbsoluteCenter
              bg="white"
              color="gray.500"
              w="3xs"
              textAlign={"center"}
            >
              OR CONTINUE WITH
            </AbsoluteCenter>
          </Flex>
        </Container>
        <Button leftIcon={<Image src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png" boxSize="1rem" />} borderColor="gray.200" variant="outline" w="lg" bg="white" shadow="sm" mt={5}>Google</Button>
      </VStack>
    </Container>
  );
}
