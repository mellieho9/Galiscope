import { ReactNode } from "react";
import { Avatar, Text, Box } from "@chakra-ui/react";
import logo from "../../../../public/logo.svg";

interface MessageProps {
  user: string;
  message: string;
  children?: ReactNode;
}

export const Message: React.FC<MessageProps> = ({
  user,
  message,
  children,
}) => {
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
        name={user}
      />
      <div className="flex flex-col">
        <h1 className="text-gray-800 text-sm font-semibold">{sender}</h1>
        <Box className="space-y-2">{formatMessage(message)}</Box>
        {children}
      </div>
    </div>
  );
};
