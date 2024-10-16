import { Jwt } from "hono/utils/jwt";

import env from "@/env";

function genToken(id: string) {
  return Jwt.sign({ id }, env.JWT_SECRET || "");
}

export default genToken;
