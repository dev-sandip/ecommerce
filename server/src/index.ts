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

// app.use("*", cors({
//   origin: [env.FRONTEND_URL, "https://ecommerce.sapkotasandip.com.np"],
//   allowHeaders: ["Origin", "Content-Type", "Authorization"],
//   allowMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));
app.use((c, next) => {
  const handler = cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    allowHeaders: ["Origin", "Content-Type", "Authorization"],
    allowMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
  });
  return handler(c, next);
});
app.use("*", logger(), prettyJSON());

// Home Route
app.get("/", c => c.text("Welcome to the API!"));

// Authentication routes
app.route("/auth", userAuth);
// Product routes
app.route("/products", productAuth);

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
export default app;
