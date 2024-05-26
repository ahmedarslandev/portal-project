import LeftPanel from "@/uiComponents/LeftPanel";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <LeftPanel />
      <div className="h-screen w-[2px] bg-zinc-500 "></div>
      <div className=" h-screen w-full overflow-hidden">
        {children}
        <Toaster />
      </div>
    </div>
  );
};

export default layout;
