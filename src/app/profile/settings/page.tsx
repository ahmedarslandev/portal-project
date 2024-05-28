"use client";

import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  interface Res {
    message: string;
    callerId?: string;
  }
  const [userDetails, setUserDetails] = useState<Res>({ message: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/fetch-callerId?email=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkYXJzbGFuYXJzbGFuOTFAZ21haWwuY29tIiwiaWF0IjoxNzE2ODUzMDUxfQ.PqiuH-DsSWMcy4tDJqrGMfI1MwHZwhCeVTqGr0Xs0HI&callerId=20935632563"
        );
        setUserDetails(response.data);
        toast({
          title: "User Details",
          description: "User Details fetched successfully",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>hello</div>
      <div>{userDetails.message}</div>
      {userDetails.callerId && <div>Caller ID: {userDetails.callerId}</div>}
    </div>
  );
};

export default Page;
