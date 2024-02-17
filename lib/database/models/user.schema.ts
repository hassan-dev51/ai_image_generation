import { Schema, models, model } from "mongoose";
export interface User {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  planId: number;
  creditBalance: number;
}

const user = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planId: {
    type: Number,
    default: 1,
  },
  creditBalance: {
    type: Number,
    default: 10,
  },
});

const UserSchema = models.user || model("User", user);
export default UserSchema;
