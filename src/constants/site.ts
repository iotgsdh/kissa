import { getConfig } from "@/libs/config";
import { cache } from "react";

export const getSite = cache(getConfig);
