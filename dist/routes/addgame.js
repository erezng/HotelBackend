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
import { Game } from "../db/models/gameModel.js";
import _ from "underscore";
const router = Router();
router.post("/addproperty", (req, res) => {
    const body = _.pick(req.body, "name", "showers", "location", "rooms", "img", "toilets");
    new Game(body)
        .save()
        .then((result) => res.json({ message: JSON.stringify(result) }))
        .catch((e) => res.json({ error: `${e}` }));
});
router.get("/search/:key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Game.find({
        $or: [{ title: { $regex: req.params.key, $options: "i" } }],
    });
    res.json(result);
}));
export { router as gamesRouter };
