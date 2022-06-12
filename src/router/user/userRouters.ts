import { Request, Response, Router } from "express";
import { HTTPStatus } from "../../utils/etc";
import { IUser } from "../../database/models/user/interface";
import { UserService } from "../../services/user/userServices";
import { authMiddleware } from "../../middlewares/auth/authMiddleware";
import { IChangeLoginUser, IChangePassUser, IChangeUser, IDeleteUser, IGetUserById, IGetUserBylogin } from "../../services/user/interfaces";

export class UserRouter {
  private readonly router: Router;
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.router = Router();
    this.router.use(authMiddleware);
    this.baseUrl = baseUrl;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.baseUrl}/all`, this.getAllUser);
    this.router.post(`${this.baseUrl}/byId`, this.getUserById);
    this.router.post(`${this.baseUrl}/bylogin`, this.getUserBylogin);
    this.router.post(`${this.baseUrl}/change/login`, this.changeLoginUser);
    this.router.post(`${this.baseUrl}/change/password`, this.changePassUser);
    this.router.post(`${this.baseUrl}/delete`, this.deleteUser);
  }

  private async getAllUser(req: Request, res: Response): Promise<void> {
    const response: IUser[] = await UserService.getAll();

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }

  private async getUserById(req: Request, res: Response): Promise<void> {
    const response: IUser[] = await UserService.getById(req.body as IGetUserById);

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }
  private async getUserBylogin(req: Request, res: Response): Promise<void> {
    const response: IUser[] = await UserService.getBylogin(req.body as IGetUserBylogin);

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }

  private async changeLoginUser(req: Request, res: Response): Promise<void> {
    const data = {
      id: res.locals.user.id,
      ...req.body
    }
    const response: IChangeUser= await UserService.changeLogin(data as IChangeLoginUser);

    res.status(HTTPStatus.SUCCESS)
      .json(response);  
  }

  private async changePassUser(req: Request, res: Response): Promise<void> {
    const data = {
      id: res.locals.user.id,
      ...req.body 
    }
    const response: IUser = await UserService.changePassword(data as IChangePassUser);

    res.status(HTTPStatus.SUCCESS)
      .json(response);  
  }

  private async deleteUser(req: Request, res: Response): Promise<void> {
    const data = {
      id: res.locals.user.id,
      ...req.body 
    }
    const response: IUser = await UserService.deleteUser(data as IDeleteUser);

    res.status(HTTPStatus.SUCCESS)
      .json(response);  
  }
};
