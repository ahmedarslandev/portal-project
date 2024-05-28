"use client";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/models/models";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Res {
  message: string;
  callerId?: string;
}

const Page = () => {
  const [userDetails, setUserDetails] = useState<Res>();
  const run = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetch-callerId?email=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkYXJzbGFuYXJzbGFuOTFAZ21haWwuY29tIiwiaWF0IjoxNzE2ODUzMDUxfQ.PqiuH-DsSWMcy4tDJqrGMfI1MwHZwhCeVTqGr0Xs0HI&callerId=20935632563`
      );
      setUserDetails(response.data);
    } catch (error) {
      return {};
    }
  };
  useEffect(() => {
    run();
    toast({
      title: "User Details",
      description: "User Details fetched successfully",
    });
  }, [userDetails]);

  return (
    <div>
      <div>hello</div>
      <div>{userDetails?.message}</div>
      {userDetails?.callerId && <div>Caller ID: {userDetails?.callerId}</div>}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {

// };

export default Page;
