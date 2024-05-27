"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User, callerId } from "@/models/models";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, CrossIcon, Loader2 } from "lucide-react";

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
      return;
    });
    res.catch((error) => {
      console.log(error);
      return;
    });
    res.finally(() => {
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <div>
        <div className="w-full  h-fit min-h-screen px-5 py-5 bg-zinc-800 flex flex-col">
          <h1 className="bg-gradient-to-r text-center from-cyan-400 to-yellow-400 text-transparent bg-clip-text text-4xl font-bold">
            Add callerId
          </h1>
          <div className=" flex flex-col  px-10 py-10">
            <p className="text-zinc-200 font-bold">Steps To add Caller Id :</p>
            <p className="text-zinc-200 text-sm px-5">
              1. Copy the callerIds from resource
            </p>
            <p className="text-zinc-200 text-sm px-5">
              2. Click Add button to go for adding callerIds
            </p>
            <p className="text-zinc-200 text-sm px-5">
              3. Paste the callerIds into the textarea field
            </p>
            <p className="text-zinc-200 text-sm px-5">
              4. Click on add button.
            </p>
            <div className=" w-14 pt-5">
              <Link href={"/profile/add-callerId"}>
                <Button disabled={isLoading}>
                  {isLoading ? (
                    <>
                      {" "}
                      <Loader2 className="animate-spin" /> Loading..
                    </>
                  ) : (
                    "Add CallerId"
                  )}
                </Button>
              </Link>
            </div>
          </div>
          <h1 className="bg-gradient-to-r text-center from-cyan-400 to-yellow-400 text-transparent bg-clip-text text-4xl font-bold">
            Your CallerIds
          </h1>
          <div className="flex  items-center px-3 py-1">
            {[
              "callerID",
              "State",
              "Counts",
              "Owner",
              "IsAvailable",
              "Delete",
            ].map((e, i) => (
              <h1
                key={i}
                className="text-white w-1/6 text-center  rounded text-sm font-semibold "
              >
                {e}
              </h1>
            ))}
          </div>
          <div className=" w-full h-[45vh] pb-10  overflow-y-scroll">
            {userDetails?.callerIds?.length > 0 ? (
              userDetails.callerIds.map((e: callerId, i) =>
                e.isAvailable ? (
                  <div
                    key={i}
                    className="w-full h-14 flex px-3  items-center text-white select-none font-semibold cursor-pointer  hover:bg-zinc-900 text-sm border-t-[1px] border-zinc-500"
                  >
                    <h1
                      key={i}
                      className="text-white  w-1/6 text-sm text-center font-semibold"
                    >
                      {e.Number}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/6 text-sm text-center font-semibold"
                    >
                      {e.state}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/6 text-sm text-center font-semibold"
                    >
                      {e.counts}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/6 text-sm text-center font-semibold"
                    >
                      {userDetails.username}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/6  flex justify-center items-center text-sm text-center font-semibold"
                    >
                      {e.isAvailable ? (
                        <CheckIcon className=" text-green-500 " />
                      ) : (
                        <CrossIcon className=" text-red-500 rotate-45" />
                      )}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/6 flex items-center justify-center text-sm text-center font-semibold"
                    >
                      <CrossIcon className=" text-red-500 rotate-45" />
                    </h1>
                  </div>
                ) : (
                  <div
                    key={i}
                    className="w-full h-14 flex px-3 opacity-45 relative  items-center text-white select-none font-semibold  text-sm border-t-[1px] border-zinc-500"
                  >
                    <div className=" w-full h-[2px] bg-red-600 absolute top-1/2 left-0"></div>
                    <h1
                      key={i}
                      className="text-white  w-1/6 text-sm text-center font-semibold"
                    >
                      {e.Number}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/6 text-sm text-center font-semibold"
                    >
                      {e.state}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/6 text-sm text-center font-semibold"
                    >
                      {e.counts}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/6 text-sm text-center font-semibold"
                    >
                      {userDetails.username}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/6  flex justify-center items-center text-sm text-center font-semibold"
                    >
                      {e.isAvailable ? (
                        <CheckIcon className=" text-green-500 " />
                      ) : (
                        <CrossIcon className=" text-red-500 rotate-45" />
                      )}
                    </h1>
                    <h1
                      key={i}
                      className="text-white  w-1/6 flex items-center justify-center text-sm text-center font-semibold"
                    >
                      <CrossIcon className=" text-red-500 rotate-45" />
                    </h1>
                  </div>
                )
              )
            ) : (
              <div className="w-full h-14 flex px-3 justify-center gap-40 items-center text-white select-none font-semibold cursor-pointer  hover:bg-slate-900 text-sm border-t-[1px] border-zinc-500">
                <h1 className="text-white  w-full text-sm text-center font-semibold">
                  You have no callerID yet.Please setup your callerId first
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
