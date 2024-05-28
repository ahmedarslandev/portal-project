"use client";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import React, { useEffect } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

interface Res {
  message: string;
  callerId?: string;
}

interface PageProps {
  userDetails: Res;
}

const Page = ({ userDetails }: PageProps) => {
  useEffect(() => {
    toast({
      title: "User Details",
      description: "User Details fetched successfully",
    });
  }, []);

  return (
    <div>
      <div>hello</div>
      <div>{userDetails.message}</div>
      {userDetails.callerId && <div>Caller ID: {userDetails.callerId}</div>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetch-callerId?email=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkYXJzbGFuYXJzbGFuOTFAZ21haWwuY29tIiwiaWF0IjoxNzE2ODUzMDUxfQ.PqiuH-DsSWMcy4tDJqrGMfI1MwHZwhCeVTqGr0Xs0HI&callerId=20935632563`
    );
    return {
      props: {
        userDetails: response.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        userDetails: {
          message: "Error fetching data",
        },
      },
    };
  }
};

export default Page;
