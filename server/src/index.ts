import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import connectDB from "./config/db";
import env from "./env";
import { errorHandler, notFound } from "./middlewares/error-middleware";
import productAuth from "./routes/product.routes";
import userAuth from "./routes/user.routes";

// Initialize the Hono app with base path
const app = new Hono().basePath("/api/v1");

// Connect MongoDB
connectDB();

app.use(
  "*",
  cors({
    origin: [env.FRONTEND_URL],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
  }),
);

app.use("*", logger(), prettyJSON());

// Home Route
app.get("/", c => c.text("Welcome to the API!"));

// Authentication routes
app.route("/auth", userAuth);
// Product routes
app.route("/product", productAuth);

// Error handling middleware
app.onError((_err, c) => errorHandler(c));

// Handle 404 Not Found
app.notFound(c => notFound(c));

// Start the server
// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${env.PORT}`);
serve({
  fetch: app.fetch,
  port: env.PORT,
});
