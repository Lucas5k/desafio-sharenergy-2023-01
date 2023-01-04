import { model as mongooseCreateModel, Schema } from 'mongoose';
import IRegister from '../interfaces/IRegister';
import MongoModel from './MongoModel';

const registerZodSchema = new Schema<IRegister>({
  name: String,
  email: String,
  telephone: String,
  address: String,
  cpf: String,
}, { versionKey: false });

class Register extends MongoModel<IRegister> {
  constructor(model = mongooseCreateModel('Register', registerZodSchema)) {
    super(model);
  }
}

export default Register;
