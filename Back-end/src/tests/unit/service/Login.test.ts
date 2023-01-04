import Sinon, * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import Model from '../../../models/User';
import Service from '../../../services/login.services';
import { LoginMock, newUser } from '../../Mocks/LoginMock';
import ErrorTypes from '../../../errors/catalog';
import IUser from '../../../interfaces/IUser';

describe('#ServiceLogin', () => {
  const model = new Model();
  const service = new Service(model);

  beforeEach(async () => {
    sinon.stub(model, 'read').resolves([LoginMock]);
    Sinon.stub(model, 'create').resolves(newUser);
  });

  afterEach(async ()=>{
    sinon.restore();
  });

  describe('#login', () => {
    it('verifica ao fazer login, se ele traz os elementos', async () => {
      const result = await service.login(LoginMock);

      expect(result).to.be.eq('login sucess');
    });

    it('verifica se ao fazer login com o body vazio se retorna o erro esperado!', async () => {
      Sinon.restore();
      Sinon.stub(model, 'read').rejects({ message: ErrorTypes.EmptyObject });

      try {
        await service.login('' as unknown as IUser);
      } catch (e: any) { 
        expect(e.message).to.be.deep.eq(ErrorTypes.EmptyObject);
      }
    });

    it("Ao mandar elementos diferentes, se retorna a message: 'incorrect username or password!'", async () => {
      Sinon.restore();
      Sinon.stub(model, 'read').rejects({ message: ErrorTypes.IncorrectUser });

      try {
        await service.login({ username: 'Marco', password: '123456789' });
      } catch (e: any) {
        expect(e.message).to.be.deep.eq(ErrorTypes.IncorrectUser);
      }
    });
  });

  describe('#create', () => {
    it("verifica ao mandar o body vazio, se recebe a message: 'the object must not be empty'", async () => {
      Sinon.restore();
      Sinon.stub(model, 'create').rejects({ message: ErrorTypes.EmptyObject });

      try {
        await service.login('' as unknown as IUser);
      } catch (e: any) { 
        expect(e.message).to.be.deep.eq(ErrorTypes.EmptyObject);
      }
    });

    it('verifica se mandar um novo elemento correto, se ele é criado corretamente', async () => {
      const result = await service.create({ username: 'Lucas', password: '123456789' });

      expect(result).to.be.deep.equal(newUser);

      Sinon.restore();
    });

    it("ao passar dados iguais, se retorna a message: 'user already exists'", async () => {
      Sinon.restore();
      Sinon.stub(model, 'read').rejects({ message: ErrorTypes.IncorrectUser });
      
      try {
        await service.create(LoginMock);
      } catch (e: any) {
        expect(e.message).to.be.deep.eq(ErrorTypes.IncorrectUser);
      }
    });
  });
});