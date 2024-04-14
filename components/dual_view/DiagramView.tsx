import { Image } from "@chakra-ui/react";
import diagram from "../../app/diagram.svg"

export function DiagramView() {
    return (
        <div className="w-full h-full flex justify-center items-center bg-gray-50">
            {/* name  */}
            <Image src={diagram.src} />
            {/* modal  */}
        </div>
    )
}