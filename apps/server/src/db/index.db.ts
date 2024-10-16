/* eslint-disable no-console */
import { connect, disconnect } from "mongoose";

import env from "@/env";

export function connectToDb() {
  return new Promise((resolve, reject) => {
    console.log("Connecting to MongoDB...");
    try {
      connect(env.DATABASE_URL as string);
      console.log("MongoDB connected!");
    }
    catch (err) {
      console.error(err);
      reject(new Error("MongoDB connection failed!"));
    }
  });
}
export async function disconnectFromDb() {
  try {
    await disconnect();
    console.log("MongoDB disconnected!");
  }
  catch (err) {
    console.error(err);
    console.log("MongoDB disconnection failed!");
  }
}
