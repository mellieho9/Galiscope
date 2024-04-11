import { FolderMenu } from "./FolderMenu";
import { SidebarItem } from "./SidebarItem";
import { UserProfile } from "./UserProfile";
import { ClockIcon, HomeIcon } from '@heroicons/react/24/outline'

export function Sidebar(){
    return(
        <div className="h-screen w-1/5 border border-gray-200 text-gray-800 font-medium flex flex-col">
            <UserProfile />
            <div className="flex flex-col p-4 space-y-1">
                <SidebarItem title={"Home"} icon={<HomeIcon />}  />
                <SidebarItem title={"Recent"} icon ={<ClockIcon />} />
            </div>
            <FolderMenu />
        </div>
    )
}