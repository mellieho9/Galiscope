import { ReactNode } from "react";
import { Avatar, Box, Skeleton } from "@chakra-ui/react";
import logo from "../../../../public/logo.svg";
import { useCurrentUser } from "@/contexts/UserContextProvider";

interface MessageProps {
  user: string;
  message: string;
  isPending?: boolean;
  children?: ReactNode;
}

export const Message: React.FC<MessageProps> = ({
  user,
  message,
  isPending,
  children,
}) => {
  const { data: userData } = useCurrentUser() ?? {};

  const sender = user === "Galiscope" ? "Galiscope" : "You";
  const imageSrc = user === "Galiscope" ? logo.src : null;

  const formatMessage = (text: string) => {
    return text.split("\n").map((line, index) => {
      if (line.startsWith("- ")) {
        return <li key={index}>{line.replace("- ", "")}</li>;
      }
      return (
        <p className="list-disc" key={index}>
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-row space-x-2 p-4 items-start text-xs text-gray-500 border-b border-gray-200">
      <Avatar
        sx={{
          img: {
            width: "40%",
            height: "40%",
          },
        }}
        bg={sender == "Galiscope" ? "gray.200" : "teal"}
        size="sm"
        src={imageSrc}
        name={userData?.name ?? "You"}
      />
      <div className="w-full flex flex-col">
        <h1 className="text-gray-800 text-sm font-semibold">{sender}</h1>
        {isPending && <Skeleton className="w-full" color="gray.500" height={1} />}
        {!isPending && <Box className="space-y-2">{formatMessage(message)}</Box>}
        {children}
      </div>
    </div>
  );
};
