import { createClient } from "microcms-js-sdk";
import { getEnv } from "./env";

export const client = createClient({
  serviceDomain: getEnv("MICROCMS_SERVICE_DOMAIN"),
  apiKey: getEnv("MICROCMS_API_KEY"),
});
