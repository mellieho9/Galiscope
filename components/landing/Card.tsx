import { Box, Text, Stack, Card, CardBody, CardHeader, Heading, StackDivider } from "@chakra-ui/react";

interface CustomCardProps {
  heading: string;
  bodyContent: Array<{
    title: string;
    description: string;
  }>;
}

export const CustomCard: React.FC<CustomCardProps> = ({ heading, bodyContent }) => {
  return (
    <Card w="xs" h="sm" variant='outline'>
      <CardHeader>
        <Heading size='md'>{heading}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          {bodyContent.map((body, index) => (
            <Box key={index}>
              <Heading size='xs' textTransform='uppercase'>
                {body.title}
              </Heading>
              <Text pt='2' fontSize='sm'>
                {body.description}
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
