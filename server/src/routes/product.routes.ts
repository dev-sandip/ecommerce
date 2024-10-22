import { Hono } from "hono";

import { protectAndIsAdmin } from "@/middlewares/auth-middleware";

import { product } from "../controllers";

const route = new Hono();

route.post("/create", protectAndIsAdmin, c => product.createProduct(c));

export default route;
