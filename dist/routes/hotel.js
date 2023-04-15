var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { Hotel } from "../db/models/hotelModel.js";
import _ from "underscore";
const router = Router();
router.post("/addproperty", (req, res) => {
    const body = _.pick(req.body, "name", "showers", "location", "rooms", "img", "toilets", "price", "priceweekend", "isfav", "cart");
    new Hotel(body)
        .save()
        .then((result) => res.json({ message: JSON.stringify(result) }))
        .catch((e) => res.json({ error: `${e}` }));
});
router.get("/search/:key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Hotel.find({
        $or: [{ name: { $regex: req.params.key, $options: "i" } }],
    });
    res.json(result);
}));
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
router.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Hotel.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send(result);
}));
router.put("/updatefav/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Hotel
        .findOne({ _id: req.params.id })
        .updateOne({ _id: req.params.id }, { $set: { $not: "$isfav" } });
    res.send(result);
}));
export { router as hotelRouter };
