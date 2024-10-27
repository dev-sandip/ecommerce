import type { Context } from "hono";

import { z } from "zod";

import { STATUS_CODE } from "@/constants";
import AddressModel from "@/models/address.model";

export async function createAddress(c: Context) {
  try {
    const userId = c.get("user")._id;
    return c.json(userId);
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

    return c.json(
      {
        message: "Something went wrong",
      },
      STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
}
