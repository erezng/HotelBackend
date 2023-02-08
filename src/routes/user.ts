import { Router } from "express";
import _ from "underscore";
import bcrypt from "bcryptjs";
import { User } from "../db/models/user.js";
import { Role } from "../db/models/role.js";
import Jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";
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

router.post("/sigin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate<{
      roles: Array<typeof Role>;
    }>("roles");
    if (!user) return res.status(401).json({ message: "User not found!" });
    const isPasswordVaild = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordVaild)
      return res.status(401).json({ message: "Invaild Credentials!" });
    const token = Jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: "30d",
    });
    const authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push(`ROLE_` + user.roles[i].name.toUpperCase());
    }
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (e) {
    return res.status(500).json({ message: "server error", error: e });
  }
});
export { router as authRouter };
