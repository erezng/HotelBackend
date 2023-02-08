import { Router } from "express";
import { Hotel } from "../models/hotel.js";
import _ from "underscore"
const router = Router();
router.post("/", (req, res) => {
  const body = _.pick(
    req.body,
    "name",
    "rooms",
    "location",
    "ac",
    "toilets",
    "showers"
  );
  const hotel = new Hotel(body);
  hotel
  .save()
  .then((saved) => {
    res.json({ message: "Saved successfully"}),
    // id: saved._id,
    // hotel:saved
  })
  .catch((e)=>{
    res.status(500).json({message:`Error:${e}`})
  });
});

export {router as hotelRouter}