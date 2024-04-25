import { Image } from "@chakra-ui/react";
import diagram from "../../../app/diagram.svg";
import { TopModal } from "./TopModal";
import { BottomModal } from "./BottomModal";

export function DiagramView() {
  return (
    <div className="w-full p-5 pb-8 min-h-screen justify-between flex flex-col justify-center items-center bg-gray-50">
      {/* name  */}
      <div className="w-full flex justify-end">
        <TopModal />
      </div>
      {/* diagonal divider  */}
      <Image boxSize="500px" src={diagram.src} />
      {/* modal  */}
      <BottomModal />
    </div>
  );
}
