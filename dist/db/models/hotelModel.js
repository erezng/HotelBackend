import { model } from "mongoose";
import { hotelsSchema } from "../schemas/hotelSchema.js";
const Hotel = model("Hotel", hotelsSchema);
export { Hotel };
