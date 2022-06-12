import User from "../../database/models/user/userSchema";
import { IUser } from "../../database/models/user/interface";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { IChangeLoginUser, IChangePassUser, IChangeUser, IDeleteUser, IGetUserById, IGetUserBylogin } from "./interfaces";
import * as bcrypt from "bcrypt";

export class UserService {
  public static async getAll(): Promise<IUser[]> {
    return await User.find({}, { password: false });
  }

  public static async getBylogin(userData: IGetUserBylogin): Promise<IUser[]> {
    return await User.find({login: userData.login}, { password: false });
  }
  
  public static async getById(userData: IGetUserById): Promise<IUser[]> {
    return await User.find({id: userData.id}, { password: false });
  }

  public static async changeLogin(userData: IChangeLoginUser): Promise<IChangeUser> {
    const user = await User.findOne({_id: userData.id});

    const isPasswordOK: boolean = bcrypt.compareSync(userData.password, user.password);
    if(!isPasswordOK)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, "Password is incorrect");
    user.login = userData.newLogin;
    const newUserData = await user.save();
    const response: IChangeUser = {
      id: newUserData.id,
      login: newUserData.login,
      createdAt: newUserData.createdAt,
    };

    return response;
  }

  public static async changePassword(userData: IChangePassUser): Promise<IUser> {
    const user = await User.findOne({_id: userData.id});

    const isPasswordOK: boolean = bcrypt.compareSync(userData.password, user.password);
    if(!isPasswordOK)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, "Password is incorrect");
    return await user.update({password: userData.newPassword});
  }

  public static async deleteUser(userData: IDeleteUser): Promise<IUser> {
    const user = await User.findOne({_id: userData.id});

    const isPasswordOK: boolean = bcrypt.compareSync(userData.password, user.password);
    if(!isPasswordOK)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, "Password is incorrect");
    return await user.delete();
  }
}