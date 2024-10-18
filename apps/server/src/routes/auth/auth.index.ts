import { createRouter } from "@/libs/create-app";

import * as handlers from "./auth.handler";
import * as routes from "./auth.route";

const router = createRouter()
  .openapi(routes.registerRoute, handlers.register)
  .openapi(routes.loginRoute, handlers.login)
  .openapi(routes.middlewarecheck, handlers.middlewarecheck);

export default router;
