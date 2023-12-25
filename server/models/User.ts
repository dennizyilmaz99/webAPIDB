// models/Item.ts
import mongoose, { Schema } from "mongoose";

interface IUser {
  username: string;
  password: string;
  // andra fält efter behov
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // andra fält efter behov
});

const Item = mongoose.model<IUser>("User", UserSchema, "users");

export default Item;
