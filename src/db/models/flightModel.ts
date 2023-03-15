import { model } from "mongoose";
import { flightSchema } from "../schemas/Flight.js";

const Flight = model("flight", flightSchema);

export { Flight };
