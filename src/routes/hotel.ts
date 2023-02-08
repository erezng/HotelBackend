import { Router } from "express";

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
});
