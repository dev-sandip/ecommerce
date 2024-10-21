import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import connectDB from "./config/db";
import env from "./env";
import { errorHandler, notFound } from "./middlewares/error-middleware";
import userAuth from "./routes/user-routes";

// import { errorHandler, notFound } from "./middlewares";
// import { Users } from "./routes";

// Initialize the Hono app
const app = new Hono().basePath("/api/v1");

// Config MongoDB
connectDB();

// Initialize middlewares
app.use("*", logger(), prettyJSON());

// Cors
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// Home Route
app.get("/", c => c.text("Welcome to the API!"));

app.route("/auth", userAuth);

// Error Handler
app.onError((_err, c) => {
  const error = errorHandler(c);
  return error;
});

// Not Found Handler
app.notFound((c) => {
  const error = notFound(c);
  return error;
});

const port = env.PORT || 8000;

// eslint-disable-next-line no-console
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
