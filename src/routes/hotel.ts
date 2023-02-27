import { Router } from "express";
import { Hotel } from "../db/models/hotelModel.js";
import _ from "underscore";

const router = Router();
router.post("/addproperty", (req, res) => {
  const body = _.pick(
    req.body,
    "name",
    "showers",
    "location",
    "rooms",
    "img",
    "toilets"
  );
  new Hotel(body)
    .save()
    .then((result) => res.json({ message: JSON.stringify(result) }))
    .catch((e) => res.json({ error: `${e}` }));
});
router.get("/search/:key", async (req, res) => {
  const result = await Hotel.find({
    $or: [{ name: { $regex: req.params.key, $options: "i" } }],
  });
  res.json(result);
});

router.get("/allhotels", (req, res) => {
  Hotel.find()
    .then((result) => res.json(result))
    .catch((e) => res.json({ error: `${e}` }));
});

export { router as hotelRouter };
