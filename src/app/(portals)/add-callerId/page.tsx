"use client";
import React from "react";

const page = () => {
  function HandelSubmit(e: any) {
    e.preventDefault();
    const callerIds = e.target.elements.callerIds.value;
    const callerIdsArray = callerIds
      .split("\n")
      .map((id: any): any => id.trim())
      .filter((id: any): any => id !== "");
  }
  return (
    <>
      <form onSubmit={HandelSubmit} action="" method="post">
        <label htmlFor="callerIds">Enter Caller Ids</label>
        <textarea
          className="bg-black text-white"
          name="callerIds"
          id="callerIds"
        />
        <button id="submit" type="submit">
          submit
        </button>
      </form>
    </>
  );
};

export default page;
