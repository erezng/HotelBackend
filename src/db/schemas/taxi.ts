import { Schema } from 'mongoose';
const taxiSchema=new Schema({
    from:String,
    dst:String,
    price:Number
})
export {taxiSchema}