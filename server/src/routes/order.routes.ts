import { Hono } from "hono";

import { order } from "@/controllers";
import { protect, protectAndIsAdmin } from "@/middlewares/auth-middleware";

const router = new Hono();

router.post("/create", protect, c => order.createOrder(c));
router.get("/", protectAndIsAdmin, c => order.getOrders(c));
router.get("/:id", protect, c => order.getOrderById(c));
router.get("/users/:id", protect, c => order.getUserOrders(c));
export default router;
