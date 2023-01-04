import IService from '../interfaces/IServiceLogin';
import IUser from '../interfaces/IUser';
import IModel from '../interfaces/IModel';
import ErrorTypes from '../errors/catalog';

class Login implements IService<IUser> {
  private _user: IModel<IUser>;

  constructor(model: IModel<IUser>) {
    this._user = model;
  }

  public async login(obj: IUser): Promise<string> {
    if (!obj) throw new Error(ErrorTypes.EmptyObject);
    
    const isValid = await this._user.read();
    const exists = isValid
      .every(({ username, password }) => obj.username === username && obj.password === password);

    if (exists) return 'login sucess';
    
    throw new Error(ErrorTypes.IncorrectUser);
  }

  public async create(obj: IUser): Promise<IUser> {
    if (!obj) throw new Error(ErrorTypes.EmptyObject);

    const isValid = await this._user.read();
    const exists = isValid
      .some(({ username }) => obj.username === username);

    if (!isValid.length) return this._user.create(obj);
    
    if (!exists) {
      return this._user.create(obj);
    }
    
    throw new Error(ErrorTypes.IncorrectName);
  }
}

export default Login;
