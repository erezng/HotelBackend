import { Router } from "express";
import _ from "underscore";
import { Hotel } from "../db/models/hotel.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { isModerator } from "../middleware/isModerator.js";
import { verifySignInBody } from "../middleware/verifySignInBody.js";
const router = Router();

router.get("/", async (req, res) => {
  //TODO: handle errors:
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

router.post("/", verifySignInBody, isAdmin || isModerator, (req, res) => {
  const body = _.pick(
    req.body,
    "name",
    "rooms",
    "location",
    "ac",
    "toilets",
    "showers",
    "img"
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
