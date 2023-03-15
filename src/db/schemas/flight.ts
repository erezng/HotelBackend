import { Schema } from 'mongoose';

const flightSchema= new Schema({
    from:String,
    dst:String,
    price:Number
})
export {flightSchema}