var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import _ from "underscore";
import { Taxi } from '../db/models/taxiModel.js';
const router = Router();
router.post("/addtaxi", (req, res) => {
    const body = _.pick(req.body, "from", "dts", "price");
    new Taxi(body)
        .save()
        .then((result) => res.json({ meddage: JSON.stringify(result) }))
        .catch((e) => res.json({ error: `${e}` }));
});
router.get("/search:key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Taxi.find({
        $or: [{ name: { $regex: req.params.key, $options: "i" } }]
    });
    res.json(result);
}));
router.get("/taxi:_id", (req, res) => {
    const id = req.params._id;
    Taxi.findOne({ _id: id })
        .then((result) => res.json(result))
        .catch((e) => res.json({ error: `${e}` }));
});
router.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Taxi.updateOne({ _id: req.params.id }, { $set: req.body });
}));
export { router as taxiRouter };
