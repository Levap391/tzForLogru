import { Request } from "express";

export interface IAuthReq extends Request{
  login: string;
  password: string;
}
