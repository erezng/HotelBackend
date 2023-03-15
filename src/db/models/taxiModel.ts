import { model } from "mongoose";
import { taxiSchema } from "../schemas/taxi.js";

const Taxi = model("taxi", taxiSchema);

export { Taxi };
