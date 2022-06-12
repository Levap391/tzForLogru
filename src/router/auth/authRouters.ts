import { Request, Response, Router } from "express";
import { HTTPStatus } from "../../utils/etc";
import { IAuthReq } from "./interfaces";
import { AuthService } from "../../services/auth/authServise";
import { IUser } from "../../database/models/user/interface";

export class AuthRouter {
  private readonly router: Router;
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.router = Router();
    this.baseUrl = baseUrl;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(`${this.baseUrl}/signup`, this.createNewAccount);
    this.router.post(`${this.baseUrl}/login`, this.loginIntoAccount);
  }

  private async createNewAccount(req: Request, res: Response): Promise<void> {
    const response: IUser = await AuthService.createNewAccount(req.body as IAuthReq);

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }

  private async loginIntoAccount(req: Request, res: Response): Promise<void> {
    const response: string = await AuthService.loginIntoAccount(req.body as IAuthReq);

    res.status(HTTPStatus.SUCCESS)
      .cookie("token", response, { httpOnly: true })
      .json(response);  
  }
};
