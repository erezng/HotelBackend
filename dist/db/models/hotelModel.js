import { model } from "mongoose";
import { hotelSchema } from "../schemas/hotel.js";
const Hotel = model("Hotel", hotelSchema);
export { Hotel };
