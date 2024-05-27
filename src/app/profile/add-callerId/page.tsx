"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handelSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const callerIds = e.target.elements.callerIds.value;
    const callerIdsArray = callerIds
      .split("\n")
      .map((id: any): any => id.trim())
      .filter((id: any): any => id !== "");
    try {
      callerIdsArray.forEach(async (code: any) => {
        const res = await axios.post("/api/portals/add-callerId", {
          Number: code,
        });
        if (res.data.status == 400 || res.data.status == undefined) {
          toast({
            title: "Error",
            description: res.data.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: res.data.message,
            variant: "default",
          });
          router.replace("/profile/configuration");
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className=" flex flex-col  justify-center items-center gap-5 bg-zinc-800 w-full h-screen">
        <h1 className="bg-gradient-to-r from-cyan-400 to-yellow-400 text-transparent bg-clip-text text-4xl font-bold ">
          Add callerIds
        </h1>
        <div
          id="animated"
          className=" relative p-[6px] rounded overflow-hidden z-30 w-fit h-fit bg-zinc-700"
        >
          <form
            onSubmit={handelSubmit}
            className="flex flex-col justify-center items-center gap-5 relative bg-zinc-800 border-zinc-400 border-[1px] p-6 rounded"
          >
            <h1 className="bg-gradient-to-r from-cyan-400 to-yellow-400 text-transparent bg-clip-text">
              To add callerIds paste the ids in textarea
            </h1>
            <label htmlFor="callerIds"></label>
            <textarea
              className=" rounded bg-zinc-100 px-3 py-1"
              name="callerIds"
              placeholder="code"
            />
            <div className="flex flex-col justify-center items-center gap-5">
              <Button disabled={isLoading} type="submit">
                {" "}
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
