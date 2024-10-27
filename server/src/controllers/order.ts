import type { Context } from "hono";

import { z } from "zod";

import type { IOrder } from "@/schema/order";

import { STATUS_CODE } from "@/constants";
import orderModel from "@/models/order.model";
import { OrderSchema } from "@/schema/order";

export async function createOrder(c: Context) {
  try {
    const userId = c.get("user")._id.toString();
    if (!userId) {
      return c.json(
        {
          message: "User not found",
        },
        STATUS_CODE.NOT_FOUND,
      );
    }
    const data = await c.req.json();
    const body: IOrder = OrderSchema.parse(data);
    const newOrder = await orderModel.create({ ...body, user: userId });
    return c.json(
      {
        message: "Order placed successfully",
        order: newOrder,
      },
      STATUS_CODE.CREATED,
    );
  }
  catch (err) {
    if (err instanceof z.ZodError) {
      return c.json(
        {
          message: "Validation error",
          errors: err.errors,
        },
        STATUS_CODE.BAD_REQUEST,
      );
    }
    // Handle other errors
    return c.json(
      {
        message: "Something went wrong",
      },
      STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function getOrders(c: Context) {
  try {
    const orders = await orderModel.find().populate("product").populate("user");
    return c.json(
      {
        message: "Orders fetched successfully",
        orders,
      },
      STATUS_CODE.OK,
    );
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (err) {
    return c.json(
      {
        message: "Something went wrong",
      },
      STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
}
export async function getOrderById(c: Context) {
  try {
    const id = c.req.param("id");
    const order = await orderModel.findById(id).populate("product").populate("user");
    if (!order) {
      return c.json(
        {
          message: "Order not found",
        },
        STATUS_CODE.NOT_FOUND,
      );
    }
    return c.json(
      {
        message: "Order fetched successfully",
        order,
      },
      STATUS_CODE.OK,
    );
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (err) {
    return c.json(
      {
        message: "Something went wrong",
      },
      STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
}
export async function getUserOrders(c: Context) {
  try {
    const userId = c.get("user")._id;
    const orders = await orderModel.find({ user: userId }).populate("product").populate("user");
    return c.json(
      {
        message: "Orders fetched successfully",
        orders,
      },
      STATUS_CODE.OK,
    );
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (err) {
    return c.json(
      {
        message: "Something went wrong",
      },
      STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
}
