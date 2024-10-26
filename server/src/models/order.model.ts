import type { Document, Model } from "mongoose";

import mongoose, { Schema } from "mongoose";

enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

enum DeliveryStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

interface IOrder {
  product: Schema.Types.ObjectId[];
  quantity: number;
  user: Schema.Types.ObjectId;
  isPaid: boolean;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  discount?: number;
  total_amount: number;
}

const OrderSchema: Schema = new Schema<IOrder>({
  product: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  quantity: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isPaid: { type: Boolean, default: false },
  paymentStatus: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING,
  },
  deliveryStatus: {
    type: String,
    enum: Object.values(DeliveryStatus),
    default: DeliveryStatus.PENDING,
  },
  discount: { type: Number, default: 0 },
  total_amount: { type: Number, required: true },
});

interface OrderDocument extends IOrder, Document { }
const orderModel: Model<OrderDocument> = mongoose.model<OrderDocument>("Order", OrderSchema);

export default orderModel;
