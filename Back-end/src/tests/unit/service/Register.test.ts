import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import Model from '../../../models/Register';
import Service from '../../../services/register.services';
import { RegisterCreate, RegisterMock, RegisterNew, RegisterNewWithId } from '../../Mocks/RegisterMock';
import ErrorTypes from '../../../errors/catalog';
import IRegister from '../../../interfaces/IRegister';

describe('#ServiceRegister', () => {
  const model = new Model();
  const service = new Service(model);

  beforeEach(async () => {
    sinon.stub(model, 'read').resolves([RegisterMock]);
    sinon.stub(model, 'readOne').resolves(RegisterCreate);
    sinon.stub(model, 'create').resolves(RegisterNewWithId);
    sinon.stub(model, 'update').resolves(RegisterCreate);
    sinon.stub(model, 'delete').resolves(true as unknown as IRegister);

  });

  afterEach(async ()=>{
    sinon.restore();
  });

  describe('#read', () => {
    it('verifica se retorna os dados corretamente.', async () => {
      const result = await service.read();

      expect(result).to.be.deep.equal([RegisterMock]);
    });
  });

  describe('#readOne', () => {
    it('verifica se ao mandar um id correto, se retorna o elemento esperado.', async () => {
      const result = await service.readOne(RegisterCreate._id);

      expect(result).to.be.deep.eq(RegisterCreate);
    });

    it('verifica se ao mandar um id errado, se retorna o erro esperado.', async () => {
      sinon.restore();
      sinon.stub(model, 'readOne').rejects({ message: ErrorTypes.idInvalid });

      try {
        await service.readOne('102');
      } catch (e: any) {
        expect(e.message).to.be.deep.eq(ErrorTypes.idInvalid);
      }
    });
  });

  describe('#create', () => {
    it('se mandar um novo elemento, se é criado corretamente', async () => {
      const result = await service.create(RegisterNew);

      expect(result).to.be.deep.equal(RegisterNewWithId);
    });

    it('verifica se não mandar dados, se retorna o erro corretamente.', async () => {
      sinon.restore();
      sinon.stub(model, 'read').rejects({ message: ErrorTypes.EmptyObject });

      try {
        await service.create({} as unknown as IRegister);
      } catch (e: any) {
        expect(e.message).to.be.deep.equal(ErrorTypes.EmptyObject);
      }
    });

    it('verifica se ao mandar dados iguais, se ele retorna o erro corretamente', async () => {
      sinon.restore();
      sinon.stub(model, 'read').rejects({ message: ErrorTypes.IncorrectData });

      try {
        await service.create(RegisterMock);
      } catch (e: any) {
        expect(e.message).to.be.deep.eq(ErrorTypes.IncorrectData);
      }
    });
  });

  describe('#update', () => {
    it('verifica ao mandar um id e dados corretos, se retorna os dados corretamente', async () => {
      const result = await service.update(RegisterNewWithId._id, RegisterMock);

      expect(result).to.be.deep.equal(RegisterCreate)
    });

    it('ao mandar um id invalido, se retorna o erro corretamente.', async () => {
      sinon.restore();
      sinon.stub(model, 'readOne').rejects({ message: ErrorTypes.idInvalid });

      try {
        await service.update('123456789123456789420145', RegisterMock);
      } catch (e: any) {
        expect(e.message).to.be.deep.equal(ErrorTypes.idInvalid);
      }
    });
  });

  describe('#delete', () => {
    it('ao mandar um id correto, se ele retorna um status 204.', async () => {
      const result = await service.delete(RegisterCreate._id);

      expect(result).to.be.true;
    });

    it('ao mandar um id invalido, se retorna o erro corretamente', async () => {
      sinon.restore();
      sinon.stub(model, 'readOne').rejects({ message: ErrorTypes.idInvalid });

      try {
        await service.delete('123456789123456789420145');
      } catch (e: any) {
        expect(e.message).to.be.deep.equal(ErrorTypes.idInvalid);
      }
    });
  });
});