import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import IService from '../interfaces/IServiceLogin';

class Login {
  constructor(private _Service: IService<IUser>) { }

  public async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const result = await this._Service.login({ username, password });

    res.status(200).json(result);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const result = await this._Service.create({ username, password });

    res.status(201).json(result);
  }
}

export default Login;