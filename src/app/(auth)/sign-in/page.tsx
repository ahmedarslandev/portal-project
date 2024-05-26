"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/signIn.schema";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/login", {
        email: values.email,
        password: values.password,
      });
      if (response.data.status === 400) {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: response.data.message,
          variant: "default",
        });
        router.replace("/profile/details");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while submitting your form",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-5 bg-zinc-800 w-full h-screen">
        <h1 className="bg-gradient-to-r from-cyan-400 to-yellow-400 text-transparent bg-clip-text text-4xl font-bold">
          Sign In
        </h1>
        <div
          id="animated"
          className=" relative p-[6px] rounded overflow-hidden z-30 w-fit h-fit bg-zinc-700"
        >
          <div className="relative bg-zinc-800 border-zinc-400 border-[1px] p-6 rounded">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          required
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-red-500 text-sm">
                        {form.formState.errors.email?.message}
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*******"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-red-500 text-sm">
                        {form.formState.errors.password?.message}
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading} type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <p className="ml-1 text-[12px] text-white">
                  Dont have an account
                  <Link
                    className="text-[14px] text-blue-500 underline"
                    href={"/sign-up"}
                  >
                    Sign Up
                  </Link>
                </p>
                <h1 className=" text-center">
                  <Link
                    className="text-[12px] text-blue-500 underline"
                    href={"/forget-password"}
                  >
                    Forgot Password
                  </Link>
                </h1>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
