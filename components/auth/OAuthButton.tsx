import { Button, Image } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface OAuthButtonProps {
  src: string;
  handleClick: () => void;
  children: ReactNode;
}

export const OAuthButton = ({
  src,
  handleClick,
  children,
}: OAuthButtonProps) => {
  return (
    <Button
      leftIcon={
        <span style={{ lineHeight: 0 }}>
          <Image src={src} boxSize={5} />
        </span>
      }
      borderColor="gray.200"
      variant="outline"
      w="sm"
      bg="white"
      shadow="sm"
      spinnerPlacement="start"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};
