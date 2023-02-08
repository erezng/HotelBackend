import { Router } from "express";
import _ from "underscore";
import bcrypt from "bcryptjs";
import { User } from "../db/models/user.js";
import { Role } from "../db/models/role.js";

const router = Router();
router.post("/signup", async (req, res) => {
  const body = _.pick(req.body, "username", "email", "password");
  body.password = await bcrypt.hash(body.password, 12);
  const user = new User(body);
  try {
    user.roles = [await (await Role.findOne({ name: "user" }))._id];
    await user.save();
    return res.json({ message: "user saved", id: user._id });
  } catch (e) {
    return res.status(500).json({ message: "Server DB error", error: e });
  }
});

// router.post("/sigup",async(req,res)=>{
//     try{
//         const user=await User.findOne({})
//     }
// })
