import { ArrowLeftIcon } from "@heroicons/react/24/solid"

export const BackButton = () => {
    return (
        <button className="flex hover:opacity-75 items-center">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          <span className="text-xs">Back</span>
        </button>
    )
}