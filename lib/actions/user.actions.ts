"use server";

import { revalidatePath } from "next/cache";

import UserSchema, { UserTypes } from "@/lib/database/models/user.schema";

import { dbConnection } from "../database/dbconnection";

type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};
// CREATE
export async function createUser(user: UserTypes) {
  try {
    await dbConnection();

    const newUser = await UserSchema.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(`error in createuser action ${error}`);
    throw new Error(`error in createuser action ${error}`);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await dbConnection();

    const user = await UserSchema.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(`error in getUserbyid function ${error}`);
    throw new Error(`error in getUserbyid function ${error}`);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await dbConnection();

    const updatedUser = await UserSchema.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(`error in updateuser action ${error}`);
    throw new Error(`error in updateuser action ${error}`);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await dbConnection();

    // Find user to delete
    const userToDelete = await UserSchema.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await UserSchema.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.log(`error in deleteuser action ${error}`);
    throw new Error(`error in deleteuser action ${error}`);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await dbConnection();

    const updatedUserCredits = await UserSchema.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    console.log(`error in updatecredits action ${error}`);
    throw new Error(`error in updatecredits action ${error}`);
  }
}
