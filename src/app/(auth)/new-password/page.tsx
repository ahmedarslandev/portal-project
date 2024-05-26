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
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { newPasswordSchema } from "@/schemas/newPassword.schema";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/new-password", {
        confirmPassword: values.confirmPassword,
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
        router.replace("/sign-in");
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
          New Password
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          required
                          placeholder="***********"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-red-500 text-sm">
                        {form.formState.errors.password?.message}
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*******"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-red-500 text-sm">
                        {form.formState.errors.confirmPassword?.message}
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
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
