"use client";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Copy, CheckIcon, CrossIcon } from "lucide-react";
import { User, callerId } from "@/models/models";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<User>(Object);
  const { toast } = useToast();
  useEffect(() => {
    setIsLoading(true);
    const res = axios.get("/api/get-user-details");
    res.then((response) => {
      const data = response.data;
      setUserDetails(data);
    });
    console.log(userDetails);
    res.catch((error) => {
      console.log(error);
      return;
    });
    res.finally(() => {
      setIsLoading(false);
    });
    toast({
      title: "User Details",
      description: "User Details fetched successfully",
    });
  }, []);

  return (
    <div className="w-full h-screen select-none bg-[#1f1f20]">
      {isLoading ? (
        <div className="w-full flex items-center justify-center h-screen text-zinc-300">
          <div className="animate-spin">
            <Loader2 className=" scale-[200%] " />
          </div>
        </div>
      ) : (
        <>
          <div className="flex relative justify-between h-1/6 bg-[#27272A] w-full">
            <div className="flex h-full w-full gap-3 p-5 items-center">
              <div className="w-[3vw] h-[3vw] flex items-center justify-center text-lg font-bold bg-green-600 rounded-full">
                A
              </div>
              <div className=" flex flex-col -leading-2">
                <h1 className=" font-semibold text-normal text-white">
                  {userDetails.username}
                </h1>
              </div>
            </div>
            <div className="flex h-ful w-fit justify-center items-center text-xs">
              <div className="w-fit h-fit relative bg-[#39393c] scale-75 flex justify-center items-center gap-2 rounded border-[1px] px-2 py-1 border-zinc-500">
                <Copy
                  className="text-white active:opacity-30 relative w-4 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(userDetails?.apiKey)
                      .then(() => {
                        toast({
                          title: "User Details",
                          description: "API Key copied successfully",
                        });
                      })
                      .catch(() => {
                        toast({
                          title: "User Details",
                          description: "Failed to copy API Key",
                        });
                      });
                  }}
                />
                <h1 className=" text-white w-[20vw] overflow-hidden whitespace-nowrap text-ellipsis select-none font-normal ">
                  {userDetails.apiKey}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-zinc-500 "></div>
          <div className="flex select-none flex-col">
            <div className="h-fit w-full px-1 py-1">
              <div className="flex justify-between  items-center">
                <div className="w-fit px-2 py-1 text-white text-normal h-fit relative bg-[#39393c] scale-75 flex justify-center items-center gap-2 rounded border-[1px]  border-zinc-500">
                  Email :
                  <h1 className=" text-white text-sm pl-2 font-semibold text-normal">
                    {userDetails.email}
                  </h1>
                </div>
                <div className=" px-2 py-1 text-white text-normal h-fit relative bg-[#39393c] scale-75 flex justify-center items-center gap-2 rounded border-[1px]  border-zinc-500">
                  isVerified :
                  <h1 className=" text-white text-sm pl-1 font-semibold text-normal">
                    {userDetails.isVerified ? (
                      <CheckIcon className=" text-green-500 " />
                    ) : (
                      <CrossIcon className=" text-red-500 rotate-45" />
                    )}
                  </h1>
                </div>
              </div>
            </div>
            <div className="w-full h-[77vh] bg-zinc-800 overflow-y-auto">
              <h1 className=" px-3 py-1 text-4xl font-extrabold text-center text-zinc-600 ">
                {" "}
                Your CallerIds
              </h1>
              <div className="flex  items-center px-3 py-1">
                {["callerID", "State", "Counts", "Owner", "IsAvailable"].map(
                  (e, i) => (
                    <h1
                      key={i}
                      className="text-white w-1/5 text-center  rounded text-sm font-semibold "
                    >
                      {e}
                    </h1>
                  )
                )}
              </div>
              {userDetails.callerIds.length > 0 ? (
                userDetails.callerIds.map((e: callerId, i) => (
                  <div
                    key={i}
                    className="w-full h-14 flex px-3  items-center text-white select-none font-semibold cursor-pointer  hover:bg-zinc-900 text-sm border-t-[1px] border-zinc-500"
                  >
                    <h1
                      key={i}
                      className="text-white  w-1/5 text-sm text-center font-semibold"
                    >
                      {e.Number}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/5 text-sm text-center font-semibold"
                    >
                      {e.state}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/5 text-sm text-center font-semibold"
                    >
                      {e.counts}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/5 text-sm text-center font-semibold"
                    >
                      {userDetails.username}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/5  flex justify-center items-center text-sm text-center font-semibold"
                    >
                      {e.isAvailable ? (
                        <CheckIcon className=" text-green-500 " />
                      ) : (
                        <CrossIcon className=" text-red-500 rotate-45" />
                      )}
                    </h1>
                  </div>
                ))
              ) : (
                <div className="w-full h-14 flex px-3 justify-center gap-40 items-center text-white select-none font-semibold cursor-pointer  hover:bg-slate-900 text-sm border-t-[1px] border-zinc-500">
                  <h1 className="text-white  w-full text-sm text-center font-semibold">
                    You have no callerID yet.Please setup your callerId first
                  </h1>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
