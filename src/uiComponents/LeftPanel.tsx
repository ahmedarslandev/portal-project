"use client";

import React from "react";
import { LogOut } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const LeftPanel = () => {
  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();
  const { toast } = useToast();
  return (
    <>
      <div className="flex relative flex-col w-[20%] bg-[#27272A] h-screen">
        <div className="flex h-1/6 justify-start gap-3 p-5 items-center">
          <div className="w-[3vw] h-[3vw] flex items-center justify-center text-lg font-bold bg-green-600 rounded-full">
            A
          </div>
          <div className=" flex flex-col -leading-2">
            <h1 className=" font-semibold text-normal text-white">
              Ahmed Arslan
            </h1>
          </div>
        </div>
        <h1 className=" w-full h-[1px] bg-zinc-500"></h1>
        <div className="flex flex-col text-white">
          {["Details", "Configuration", "Settings", "Contact"].map((e, i) => (
            <Link key={i} href={`/profile/${e.toLocaleLowerCase()}`}>
              <div
                key={i}
                className={`w-full h-14 flex justify-start ${
                  pathname === `/profile/${e.toLocaleLowerCase()}`
                    ? "bg-zinc-700"
                    : "bg-transparent"
                } pl-9 items-center select-none font-semibold cursor-pointer hover:text-zinc-300 hover:bg-zinc-600  text-base border-t-[1px] border-zinc-500`}
              >
                {e}
              </div>
            </Link>
          ))}
        </div>
        <div
          onClick={(e) => {
            axios.post("/api/auth/logout").then((res) => {
              toast({
                title: "Success",
                description: res.data.message,
              });
              router.replace("/sign-in");
            });
          }}
          className="absolute bottom-0 left-0 w-full h-14 select-none flex justify-start pl-9 items-center font-semibold cursor-pointer text-white hover:text-zinc-300 hover:bg-zinc-600 text-base border-t-[1px] border-zinc-500"
        >
          Logout
          <LogOut className="absolute select-none right-0 mr-2" />
        </div>
      </div>
    </>
  );
};

export default LeftPanel;
