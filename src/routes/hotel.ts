import { Router } from "express";
import { Hotel } from "../db/models/hotelModel.js";
import _, { filter, result } from "underscore";
import { validateToken } from "../middleware/validateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();
router.post("/addproperty", (req, res) => {
  const body = _.pick(
    req.body,
    "name",
    "showers",
    "location",
    "rooms",
    "img",
    "toilets",
    "price",
    "priceweekend",
    "isfav",
    "cart"
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

router.get("/hotel/:_id", (req, res) => {
  const id = req.params._id;
  Hotel.findOne({ _id: id })
    .then((result) => res.json(result))
    .catch((e) => res.json({ error: `${e}` }));
});

router.delete("/delete/:id", (req, res) => {
  Hotel.deleteOne({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((e) => res.json({ error: `${e}` }));
});

router.put("/update/:id", async (req, res) => {
  const result = await Hotel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

router.put("/updatefav/:id", async (req, res) => {
  const result = await Hotel
  .findOne({  _id: req.params.id })
  .updateOne(
    { _id: req.params.id },
    { $set: {$not: "$isfav"}}
  );
  res.send(result);
});
export { router as hotelRouter };
