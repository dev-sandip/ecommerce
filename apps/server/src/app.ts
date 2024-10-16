import configureOpenAPI from "@/libs/configure-open-api";
import createApp from "@/libs/create-app";
import auth from "@/routes/auth/auth.index";
import product from "@/routes/products/product.index";

import { connectToDb } from "./db/index.db";

const app = createApp();

configureOpenAPI(app);
connectToDb();

const routes = [
  auth,
  product,
] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
