import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { IUser } from "../../database/models/user/interface";
import User from "../../database/models/user/userSchema"
import { getDotEnv } from "../../utils/getDotEnv";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { IAuthData } from "./interfaces";


export class AuthService {
  static async createNewAccount(userData: IAuthData): Promise<IUser> {
    const isTaken = await User.findOne({ login: userData.login });
    if(isTaken)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, `Login ${userData.login} is taken..`);
    const _password = bcrypt.hashSync(userData.password, +getDotEnv("salt_rnds"));
    const user: IUser = await User.create({
      login: userData.login,
      password: _password
    });

    return user;
  }

  static async loginIntoAccount(userData: IAuthData): Promise<string> {
    const { 
      login, 
      password
    } = userData;
    const user: IUser = await User.findOne({ login });
    if(!user)
      throw new ApplicationError(HTTPStatus.NOT_FOUND, `User ${login} not found`);
    const isPasswordOK: boolean = bcrypt.compareSync(password, user.password);
    if(!isPasswordOK)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, "Password is incorrect");
    const token: string = jwt.sign({id: user.id} as jwt.JwtPayload, getDotEnv("jwt_secret_access"), {
      expiresIn: 1000 * 60 * 15 
      /* 15 min. */
    });

    return token;
  }
}