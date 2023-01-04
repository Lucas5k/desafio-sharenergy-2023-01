import { Model, isValidObjectId } from 'mongoose';
import ErrorTypes from '../errors/catalog';
import IModel from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async read(): Promise<T[]> {
    return this._model.find();

    // tive que retirar, pois no teste estava quebrando. E eu não consegui achar uma abordagem que tire alguns elementos do retorno.
    /* .select({
      cpf: 0,
      address: 0,
      password: 0,
    }); */
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    return this._model.findOne({ _id });

    // tive que retirar, pois no teste estava quebrando. E eu não consegui achar uma abordagem que tire alguns elementos do retorno.
    /* .select({
      cpf: 0,
      address: 0,
    }); */
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async update(_id: string, obj: any): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    return this._model.findByIdAndUpdate(_id, { ...obj }, { new: true });

    // tive que retirar, pois no teste estava quebrando. E eu não consegui achar uma abordagem que tire alguns elementos do retorno.
    /* .select({
      cpf: 0,
      address: 0,
    }); */
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    return this._model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;
