import axios from "axios";
import { ReactElement, ReactNode } from "react";
import { Resend } from "resend";

const resend = new Resend("re_Wy3RYXDT_Gn731hVVbq4qZHao4xirzppg");

export enum MailType {
  INVITE = "INVITE",
}

export type SendMailProps = {
  to: string;
  react: ReactElement;
  type: MailType;
};

const sendMail = ({ to, react, type }: SendMailProps) => {
  let payload = {
    from: "",
    to: "",
    subject: "",
    react,
  };

  switch (type) {
    case MailType.INVITE:
      payload = {
        from: "support@apibuddy.samarpit.dev",
        to,
        subject: "You have been invited to join a workspace",
        react,
      };
      break;

    default:
      break;
  }

  try {
    (async () => {
      try {
        await resend.emails.send(payload);
      } catch (e: any) {
        console.log(e.message);

        if (e.message === "Socket connection timeout") {
          console.log("Trying again");

          sendMail({ to, react, type });
        }
      }
    })();
  } catch (e: any) {
    console.log("Error is gere");
    if (e.message === "Socket connection timeout") {
      console.log("Socket connection timeout");
    }
  }
};

export default sendMail;
