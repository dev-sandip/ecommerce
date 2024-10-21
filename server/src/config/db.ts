import * as mongoose from "mongoose";

import env from "@/env";

async function connectDB() {
  try {
    if (env.DATABASE_URL !== undefined) {
      const conn = await mongoose.connect(env.DATABASE_URL, {
        autoIndex: true,
      });

      // eslint-disable-next-line no-console
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  }
  catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

export default connectDB;
