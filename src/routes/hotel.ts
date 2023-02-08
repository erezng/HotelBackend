import { Router } from "express";
import _ from "underscore";
import { Hotel } from "../db/models/hotel.js";
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
    .then(
      (saved) => res.json({ message: "Saved successfully" })
      // id: saved._id,
      // hotel:saved
    )
    .catch((e) => {
      res.status(500).json({ message: `Error:${e}` });
    });
});

export { router as hotelRouter };
