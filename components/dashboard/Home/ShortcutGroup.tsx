import { Heading } from "@chakra-ui/react";
import { ShortcutButton } from "./ShortcutButton";
import PaperUpload from "@/components/modals/PaperUpload";

export function ShortcutGroup() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-20 border-b border-gray-200">
      <Heading size="md">What do you want to do today?</Heading>
      <div className="flex flex-row mt-3 space-x-2">
        <ShortcutButton onClick={() => <PaperUpload />}>
          Read a paper
        </ShortcutButton>
        <ShortcutButton>Bookmark a paper</ShortcutButton>
        <ShortcutButton>Refresh on previous findings</ShortcutButton>
      </div>
    </div>
  );
}
