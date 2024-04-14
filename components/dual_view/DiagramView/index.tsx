import { Image } from "@chakra-ui/react";
import diagram from "../../../app/diagram.svg"
import { TopModal } from "./TopModal";

export function DiagramView() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50">
            {/* name  */}
            <TopModal />
            {/* diagonal divider  */}
            
            <Image src={diagram.src} />
            {/* modal  */}
        </div>
    )
}