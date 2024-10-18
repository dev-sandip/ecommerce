import { hc } from "hono/client";
import { AppType } from "../../../server/dist/src/app"
export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);

