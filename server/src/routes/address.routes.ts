import { Hono } from "hono";

import { order } from "@/controllers";
import { protect } from "@/middlewares/auth-middleware";

const router = new Hono();

router.post("/create", protect, c => order.createOrder(c));
export default router;
