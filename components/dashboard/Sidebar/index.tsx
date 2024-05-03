import { ClockIcon, HomeIcon } from "@heroicons/react/24/outline";
import { SidebarItem } from "./SidebarItem";
import { UserProfile } from "./UserProfile";
import { FolderMenu } from "./FolderMenu";

export function Sidebar() {
  return (
    <div className="min-h-screen w-1/4 border border-gray-200 text-gray-800 font-medium flex flex-col">
      <UserProfile />
      <div className="flex flex-col p-4 space-y-1">
        <SidebarItem
          redirectTo="/dashboard/"
          title="Home"
          icon={<HomeIcon />}
        />
        <SidebarItem
          redirectTo="/dashboard/recent"
          title="Recent"
          icon={<ClockIcon />}
        />
      </div>
      <FolderMenu />
    </div>
  );
}
