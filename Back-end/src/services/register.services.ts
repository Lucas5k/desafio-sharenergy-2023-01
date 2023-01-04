import IRegister from '../interfaces/IRegister';
import IService from '../interfaces/IService';
import IModel from '../interfaces/IModel';
import ErrorTypes from '../errors/catalog';

class Register implements IService<IRegister> {
  private _register: IModel<IRegister>;

  constructor(model: IModel<IRegister>) {
    this._register = model;
  }

  public async read(): Promise<IRegister[]> {
    return this._register.read();
  }

  public async readOne(_id: string): Promise<IRegister | null> {
    const idInvalid = await this._register.readOne(_id);
    if (!idInvalid) throw new Error(ErrorTypes.idInvalid);

    return this._register.readOne(_id);
  }
  
  public async create(obj: IRegister): Promise<IRegister> {
    if (!obj) throw new Error(ErrorTypes.EmptyObject);

    const isValid = await this._register.read();
    const exists = isValid
      .some(({ cpf, email }) => obj.cpf === cpf || obj.email === email);

    if (!isValid.length) return this._register.create(obj);

    if (!exists) {
      return this._register.create(obj);
    }
    
    throw new Error(ErrorTypes.IncorrectData);
  }

  public async update(_id: string, obj: IRegister): Promise<IRegister | null> {
    const idInvalid = await this._register.readOne(_id);
    if (!idInvalid) throw new Error(ErrorTypes.idInvalid);

    const result = await this._register.update(_id, { ...obj });

    if (!result) return null;
    return result
  }

  public async delete(_id: string): Promise<IRegister | null> {
    const idInvalid = await this._register.readOne(_id);
    if (!idInvalid) throw new Error(ErrorTypes.idInvalid);

    return this._register.delete(_id);
  }
}

export default Register;
