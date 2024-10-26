import { Types } from "mongoose";
import { z } from "zod";

const PaymentStatus = z.enum(["pending", "completed", "failed"]);
const DeliveryStatus = z.enum(["pending", "shipped", "delivered", "canceled"]);

export const OrderSchema = z.object({
  product: z.array(z.instanceof(Types.ObjectId)).nonempty("Product array cannot be empty"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  discount: z.number().int().default(0),
  total_amount: z.number().int().positive("Total amount must be a positive integer"),
  user: z.instanceof(Types.ObjectId),
  isPaid: z.boolean().default(false),
  paymentStatus: PaymentStatus.default("pending"),
  deliveryStatus: DeliveryStatus.default("pending"),
});

export type IOrder = z.infer<typeof OrderSchema>;
