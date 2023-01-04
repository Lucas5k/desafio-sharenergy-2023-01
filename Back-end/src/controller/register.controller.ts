import { Request, Response } from 'express';
import IRegister from '../interfaces/IRegister';
import IService from '../interfaces/IService';

class Register {
  constructor(private _Service: IService<IRegister>) { }

  public async read(_req: Request, res: Response): Promise<void> {
    const result = await this._Service.read();

    res.status(200).json(result)
  }

  public async readOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this._Service.readOne(id);

    res.status(200).json(result);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const result = await this._Service.create(req.body);

    res.status(201).json(result);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this._Service.update(id, req.body);

    res.status(200).json(result);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this._Service.delete(id);

    res.sendStatus(204);
  }
}

export default Register;
