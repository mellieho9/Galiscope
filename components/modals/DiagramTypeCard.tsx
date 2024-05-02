import { Card, Box, CardBody, Image, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface CustomCardProps {
  content: string;
  selectedType: string;
  setSelectedType: (type: string) => void;
  imageLink: any;
}

export const DiagramTypeCard: React.FC<CustomCardProps> = ({
  content,
  selectedType,
  setSelectedType,
  imageLink,
}) => {
  return (
    <>
      <Card
        border="1px"
        borderColor={selectedType === content ? "teal" : "gray.200"}
        _hover={{
          boxShadow: "md",
          transform: "scale(1.05)",
          transition: "all 0.2s ease-in-out",
        }}
        onClick={() => {
          selectedType !== content ? setSelectedType(content) : setSelectedType("");
        }}
      >
        <CardBody pt={0} pl={0} pr={0} pb={4}>
          <Image
            width="100%"
            height="100%"
            objectFit="cover"
            src={imageLink}
            alt="Diagram Type"
          />
          <Box mt="6" textAlign="center">
            <Text color="gray.500">{content}</Text>
          </Box>
        </CardBody>
        {selectedType === content && (
          <CheckCircleIcon
            color="teal"
            className="absolute size-1/5	 top-0 right-0"
          />
        )}
      </Card>
    </>
  );
};
