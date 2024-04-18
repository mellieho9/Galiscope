import { Sidebar } from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full bg-white flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
};

export default RootLayout;
