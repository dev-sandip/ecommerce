import { Hono } from "hono";

import { protectAndIsAdmin } from "@/middlewares/auth-middleware";

import { product } from "../controllers";

const route = new Hono();

route.post("/create", protectAndIsAdmin, c => product.createProduct(c));
route.get("/", c => product.getProducts(c));
route.get("/:id", c => product.getProductById(c));

export default route;
