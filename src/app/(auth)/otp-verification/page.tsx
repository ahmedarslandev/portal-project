"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const router = useRouter();
  const handelSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    setOTP("");
    try {
      const res = await axios.post("/api/auth/OTP-Verification", {
        OTP: e.target[0].value,
      });
      console.log(res.data.status);
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
        router.replace("/new-password");
      }
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
      <div className=" flex flex-col justify-center items-center gap-5 bg-zinc-800 w-full h-screen">
        <h1 className="bg-gradient-to-r from-cyan-400 to-yellow-400 text-transparent bg-clip-text text-4xl font-bold ">
          OTP Verification
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
              Enter OTP Verification Code sent to your email
            </h1>
            <Input
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              name="OTP"
              type="text"
              placeholder="OTP"
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
                  "Verify"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
