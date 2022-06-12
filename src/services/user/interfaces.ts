import mongoose from "mongoose";

export interface IGetUserById {
  id: string;
}
export interface IGetUserBylogin {
  login: string;
}
export interface IChangeLoginUser {
  id: string;
  newLogin: string;
  password: string;
}
export interface IChangePassUser {
  id: string;
  password: string;
  newPassword: string;
}
export interface IChangeUser {
  id: mongoose.Types.ObjectId;
  login: string;
  createdAt: Date;
}
export interface IDeleteUser {
  id: string;
  password: string;
}
