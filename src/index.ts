import bodyParser from "body-parser";
import { App } from "./app/app";
import { getDotEnv } from "./utils/getDotEnv";
import express from "express";
import { AuthRouter } from "./router/auth/authRouters";
import { UserRouter } from "./router/user/userRouters";
import cookieParser from "cookie-parser";
require("./database/index");

const port = +getDotEnv("port")
const app = new App({
  port,
  middlewares: [bodyParser.urlencoded({ extended: true }), express.json(), cookieParser()],
  routers: [new AuthRouter("/auth"), new UserRouter("/user")],
  baseUrl: "/",
});

app.start();
