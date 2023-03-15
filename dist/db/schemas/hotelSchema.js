import { Schema } from "mongoose";
const hotelsSchema = new Schema({
    name: String,
    showers: Number,
    location: String,
    rooms: Number,
    img: String,
    toilets: Number,
    price: Number,
    priceweekend: Number
});
export { hotelsSchema };
