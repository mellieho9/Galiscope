import { Box, Heading, Image, Text } from "@chakra-ui/react";
import diagram from "../../app/diagram.svg";
import { CardAction } from "./CardAction";

interface DiagramCardProps {
  diagramUrl?: string;
  title: string;
  location: string;
  redirectTo?: string;
}

export const DiagramCard: React.FC<DiagramCardProps> = ({
  diagramUrl,
  title,
  location,
  redirectTo,
}) => {
  return (
    <div className="transition ease-in-out delay-150 border border-gray-200 bg-gray-50 rounded-lg hover:border-teal">
      <Box
        overflow="hidden"
        borderRadius="lg"
        width="165px"
        height="165px"
        display="flex"
        flexDirection="column"
      >
        <Image
          src={diagramUrl || diagram.src}
          width="full"
          height="65%"
          objectFit="fill"
        />
        <div className="flex-grow p-2 space-y-1 border-t border-gray-200 bg-white cursor-pointer">
          <Heading isTruncated color="gray.600" size="xs">
            {title}
          </Heading>
          <div className="flex flex-row justify-between text-xs text-gray-500">
            <Text isTruncated>{location}</Text>
            <CardAction handleDeleteFolder={function (): void {
                          throw new Error("Function not implemented.");
                      } } />
          </div>
        </div>
      </Box>
    </div>
  );
};
