import { Schema } from "mongoose";

const hotelSchema = new Schema({
  name: String,
  rooms: Number,
  location: String,
  ac: Boolean,
  toilet: Number,
  shower: Number,
});
export { hotelSchema };
