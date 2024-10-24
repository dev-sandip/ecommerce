import { handle } from "@hono/node-server/vercel";

// eslint-disable-next-line antfu/no-import-dist
import app from "../dist/src/index";

export default handle(app);
