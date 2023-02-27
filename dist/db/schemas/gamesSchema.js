import { Schema } from "mongoose";
const gamesSchema = new Schema({
    name: String,
    showers: Number,
    location: String,
    rooms: Number,
    img: String,
    toilets: Number,
});
export { gamesSchema };
