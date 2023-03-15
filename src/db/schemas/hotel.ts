import { Schema } from "mongoose";

const hotelSchema = new Schema({
  name: String,
  rooms: Number,
  location: String,
  toilets: Number,
  showers: Number,
  img: String,
  price:Number,
  priceweekend:Number
});
export { hotelSchema };
