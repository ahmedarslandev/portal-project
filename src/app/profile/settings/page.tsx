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
      "api/fetch-callerId?email=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkYXJzbGFuYXJzbGFuOUBnbWFpbC5jb20iLCJpYXQiOjE3MTY3MDg3NzV9.DjFfb3ebc8uwwWQAfHpCVkvPDravcwPukqIep6_-gPM&callerId=20945675647"
    );
    res.then((response) => {
      const data = response.data;
      setUserDetails(data);
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
  return <div>{userDetails?.message}</div>;
};

export default Page;
