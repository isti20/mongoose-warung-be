import express from "express";
import cors from "cors";
import { PORT } from "./env.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true}));


app.listen(PORT, () => console.log("Server running on port", PORT));