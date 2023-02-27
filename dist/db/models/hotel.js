import { model } from "mongoose";
import { hotelSchema } from "../../db/schemas/hotel.js";
const Hotel = model("Hotel", hotelSchema);
export { Hotel };
