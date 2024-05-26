import { EmailTemplate } from "./EmailTemplate";
import { Resend } from "resend";

export const sendEmailVerification = async ({ email, username, OTP }: any) => {
  const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: `Hello ${username}`,
      text: `Hello ${username}`,
      react: EmailTemplate({ OTP, username }),
    });

    if (error) {
      return;
    }

    console.log("email sent successfully");
  } catch (error) {
    console.log("email verification send error");
  }
};
