import * as React from "react";

interface EmailTemplateProps {
  username: string;
  OTP: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  username,
  OTP,
}: any) => {
  return (
    <div>
      <h1>Hello {username}</h1>
      <p>Your OTP code is {OTP}</p>
    </div>
  );
};
