import { model } from "mongoose";
import { hotelSchema } from "../schemas/hotel.js";

const Hotel = model("Hotels", hotelSchema);
export { Hotel };
