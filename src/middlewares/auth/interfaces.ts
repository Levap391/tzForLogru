import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IAuthedReq extends Request {
  user: JwtPayload|string;
}

export interface jwtId extends JwtPayload {
  id: string;
}