import mongoose from "mongoose";
import { getDotEnv } from "../utils/getDotEnv";

mongoose.connect(getDotEnv("BD_HOST"))
  .then(async () => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(error));
