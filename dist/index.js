import express from "express";
import morgan from "morgan";
import { connect } from "./db/connect.js";
import { notFound } from "./middleware/not-found.js";
import cors from "cors";
import { authRouter } from "./routes/user.js";
import { hotelRouter } from "./routes/hotel.js";
import { taxiRouter } from "./routes/taxi.js";
import { flightRouter } from "./routes/flight.js";
const app = express();
connect().catch((e) => {
    console.log(e);
});
//middlewares:
app.use(cors({ origin: "http://localhost:3000" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next();
});
app.use(express.json());
app.use(morgan("dev"));
//routes:
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/taxi", taxiRouter);
app.use("/api/flight", flightRouter);
//404:
app.use(notFound);
const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
