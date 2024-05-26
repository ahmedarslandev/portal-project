"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handelSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    setEmail("");
    try {
      const res = await axios.post("/api/auth/forget-password", {
        email: e.target[0].value,
      });
      if (res.data.status >= 400 || res.data.status == undefined) {
        toast({
          title: "Error",
          description: res.data.message,
          variant: "destructive",
        });
        return;
      } else {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "default",
        });
        router.replace("/otp-verification");
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
        <h1 className="bg-gradient-to-r from-cyan-400 to-yellow-400 text-transparent bg-clip-text text-4xl font-bold">
          Forgot Password
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
              OTP Verification Code will send to your email
            </h1>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="example@gmail.com"
            />
            <div className="flex flex-col justify-center items-center gap-5">
              <Button type="submit">
                {" "}
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
              <p className="ml-1 text-[12px] text-white">
                I have remembered my password{" "}
                <Link
                  className="text-[14px] ml-[1px] text-blue-500 underline"
                  href={"/sign-in"}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
