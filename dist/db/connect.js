var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import dbConfig from "./config/db.config.js";
import { Role } from "./models/role.js";
const { HOST, DB, PORT, ROLES } = dbConfig;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    //mongoose 7 update:
    mongoose.set("strictQuery", false);
    yield mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);
    console.log(`Succesfully connected to the database ${DB}`);
    initDB();
});
const initDB = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            ROLES.map((s) => new Role({ name: s })).forEach((role) => {
                role.save((err) => {
                    if (err)
                        console.log(err);
                    else
                        console.log("added", role.name, "to roles colection");
                });
            });
        }
    });
};
export { connect };
