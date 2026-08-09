import { Resend } from "resend";
import { getEnv } from "./env";

const resendApiKey = getEnv("RESEND_API_KEY");

if (!resendApiKey) {
  throw new Error(
    "Missing RESEND_API_KEY environment variable. " +
      "Get your API key from https://resend.com/api-keys",
  );
}

export const resend = new Resend(resendApiKey);
