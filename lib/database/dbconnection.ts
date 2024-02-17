import mongoose, { Mongoose } from "mongoose";

const MONDODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

//a variable decleared to check wethere the connection is connected or not.

let cached: MongooseConnection = (global as any).mongoose;

if (!cached.conn) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const dbConnection = async () => {
  if (cached.conn) return cached.conn;

  if (!MONDODB_URL) throw new Error("Connection failed due to invalid string");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONDODB_URL, {
      dbName: "imagegeneration",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
