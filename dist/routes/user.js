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
import _ from "underscore";
import bcrypt from "bcryptjs";
import { User } from "../db/models/user.js";
import { Role } from "../db/models/role.js";
import Jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";
import { userAlreadyExists } from "../middleware/userAlreadyExists.js";
import { validateSignUp } from "../middleware/validateSignUp.js";
const router = Router();
router.post("/signup", validateSignUp, userAlreadyExists, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "username", "email", "password");
    body.password = yield bcrypt.hash(body.password, 12);
    const user = new User(body);
    try {
        user.roles = [yield (yield Role.findOne({ name: "user" }))._id];
        yield user.save();
        return res.json({ message: "user saved", id: user._id });
    }
    catch (e) {
        return res.status(500).json({ message: "Server DB error", error: e });
    }
}));
router.post("/sigin", validateSignUp, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email: req.body.email }).populate("roles");
        if (!user)
            return res.status(401).json({ message: "User not found!" });
        const isPasswordVaild = yield bcrypt.compare(req.body.password, user.password);
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
    }
    catch (e) {
        return res.status(500).json({ message: "server error", error: e });
    }
}));
export { router as authRouter };
