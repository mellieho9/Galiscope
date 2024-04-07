import { useState } from 'react';
import { FormControl, FormLabel, useToast, Container, VStack } from '@chakra-ui/react';
import CustomInput from './Input';
import CustomButton from './Button';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const isFormValid = () => email.length > 0 && password.length > 0;

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!isFormValid()) {
      toast({
        title: 'Error',
        description: 'Please fill in both email and password',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      // await login({ email, password });
      toast({
        title: 'Success',
        description: 'Logged in successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
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
        <FormLabel htmlFor="email">Password</FormLabel>
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
          onClick={handleLogin}
          isDisabled={isLoading || !isFormValid()}
          width="full"
          marginY={4}
        >
          Log In
        </CustomButton>
      </VStack>
    </Container>
  );
}
