import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getDotEnv } from "../../utils/getDotEnv";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { jwtId } from "./interfaces";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies["token"];
    
    if(!token)
      throw new ApplicationError(HTTPStatus.NOT_FOUND, "Token not found");
    const validation = <jwtId>jwt.verify(token, getDotEnv("jwt_secret_access"));
    console.log(validation);
    
    if(!validation)
      return next(new ApplicationError(HTTPStatus.UNAUTHORIZED, "Token wasn't validated"));
    const newtoken = jwt.sign({id: validation.id} as jwt.JwtPayload, getDotEnv("jwt_secret_access"), {
      expiresIn: 1000 * 60 * 15 
      /* 15 min. */
    });
      res.cookie("token", newtoken, { httpOnly: true })
    res.locals.user = validation

    next();
  }
  catch(err) { 
    return next(new ApplicationError(HTTPStatus.UNAUTHORIZED, "Auth to proceed"));
  }
}
