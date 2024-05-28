"use client";

import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  interface res {
    message: string;
  }
  const [userDetails, setUserDetails] = useState<res>(Object);
  useEffect(() => {
    const res = axios.get(
      "/api/fetch-callerId?email=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkYXJzbGFuYXJzbGFuOTFAZ21haWwuY29tIiwiaWF0IjoxNzE2ODUzMDUxfQ.PqiuH-DsSWMcy4tDJqrGMfI1MwHZwhCeVTqGr0Xs0HI&callerId=20935632563"
    );
    res.then((response) => {
      const data = response.data;
      setUserDetails(response.data);
      console.log(data);
    });
    console.log(userDetails);
    res.catch((error) => {
      console.log(error);
      return;
    });
    res.finally(() => {});
    toast({
      title: "User Details",
      description: "User Details fetched successfully",
    });
  }, []);
  return (
    <div>
      <div>hello</div>
      {userDetails.message}
    </div>
  );
};

export default Page;
