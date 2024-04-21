"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation"; // Import useNavigation

interface SidebarItemProps {
  icon: ReactNode;
  redirectTo: string;
  title: string;
}

export function SidebarItem({ icon, redirectTo, title }: SidebarItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(redirectTo);
  };

  return (
    <button
      className="z-5 border-transparent flex flex-row p-1 space-x-3 items-center transition ease-in-out delay-150 hover:bg-baby-lime border-l-2 hover:border-teal active:border-teal active:bg-baby-lime cursor-pointer"
      onClick={handleClick}
      tabIndex={0}
    >
      <span className="w-5 h-5 text-teal">{icon}</span>
      <h3 className="truncate text-sm font-medium">{title}</h3>
    </button>
  );
}
