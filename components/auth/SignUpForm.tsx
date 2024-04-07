import { useState } from "react";
import {
  FormControl,
  FormLabel,
  useToast,
  VStack,
  Container,
  HStack,
} from "@chakra-ui/react";
import CustomInput from "./Input";
import CustomButton from "../Button";

export const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const isFormValid = () =>
    firstName.length > 0 &&
    lastName.length > 0 &&
    email.length > 0 &&
    password.length > 0;

  const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isFormValid()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      // await signup({ firstName, lastName, email, password });
      toast({
        title: "Success",
        description: "Check your email to verify your account",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container centerContent w="lg">
      <VStack as="form" w="lg" spacing={4} marginTop={5}>
        <HStack w="lg" spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="first_name">First Name</FormLabel>
            <CustomInput
              id="first_name"
              placeholder="John"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              isDisabled={isLoading}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <CustomInput
              id="last_name"
              placeholder="Doe"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              isDisabled={isLoading}
            />
          </FormControl>
        </HStack>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <CustomInput
            id="email"
            placeholder="name@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isDisabled={isLoading}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <CustomInput
            id="password"
            placeholder="Must have at least 8 characters"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isDisabled={isLoading}
          />
        </FormControl>
        <CustomButton
          isLoading={isLoading}
          loadingText="Signing Up..."
          onClick={handleSignup}
          marginY={4}
          isDisabled={isLoading || !isFormValid()}
        >
          Sign Up with Email
        </CustomButton>
      </VStack>
    </Container>
  );
};
