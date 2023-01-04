import Modell from '../../../models/Register';
import * as Sinon from 'sinon';
import { Model } from 'mongoose';
import { RegisterMock, RegisterCreate, RegisterNewWithId, RegisterNew } from '../../Mocks/RegisterMock';
import chai from 'chai';
import ErrorTypes from '../../../errors/catalog';
const { expect } = chai;

describe('#ModelRegister', () => {
  const model = new Modell();

  beforeEach(async () => {
    Sinon.stub(Model, 'find').resolves([RegisterMock]);
    Sinon.stub(Model, 'findOne').resolves(RegisterCreate);
    Sinon.stub(Model, 'create').resolves(RegisterNewWithId);
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(RegisterNewWithId);
    Sinon.stub(Model, 'findByIdAndDelete').resolves(RegisterNewWithId);
  });

  afterEach(async () => {
    Sinon.restore();
  });

  describe('#read', () => {
    it('verifica se tras todos elementos de forma correta', async () => {
      const result = await model.read();

      expect(result).to.be.deep.eq([RegisterMock]);
    });
  });

  describe('#readOne', () => {
    it('verifica se a partir do id, se ele tras o elemento correto', async () => {
      const result = await model.readOne(RegisterCreate._id);

      expect(result).to.be.deep.eq(RegisterCreate);
    });

    it('verifica se ao passar id invalid, se retorna o erro correto', async () => {
      Sinon.restore();
      Sinon.stub(model, 'readOne').rejects({ message: ErrorTypes.InvalidMongoId });

      try {
        await model.readOne('102');
      } catch (e: any) {

        expect(e.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('#create', () => {
    it('verifica se cria um elemento corretamente', async () => {
      const result = await model.create(RegisterNew);

      expect(result).to.be.deep.eq(RegisterNewWithId);
    });
  });

  describe('#update', () => {
    it('verifica se ao mandar um id correto, se ele atualiza corretamente', async () => {
      const result = await model.update(RegisterNewWithId._id, RegisterNew);

      expect(result).to.be.deep.equal(RegisterNewWithId);
    });

    it('verifica se ao mandar um id invalido, se retorna o erro corretamente', async () => {
      Sinon.restore();
      Sinon.stub(model, 'update').rejects({ message: ErrorTypes.InvalidMongoId });

      try {
        await model.update('102', RegisterNew);
      } catch (e: any) {
        expect(e.message).to.be.deep.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('#delete', () => {
    it('verifica se ao mandar um id correto, se ele deleta corretamente', async () => {
      const result = await model.delete(RegisterNewWithId._id);

      expect(result).to.be.deep.eq(RegisterNewWithId);
    });
  });

  it('verifica ao mandar um id invalido, se retorna o erro corretamente', async () => {
    Sinon.restore();
    Sinon.stub(model, 'delete').rejects({ message: ErrorTypes.InvalidMongoId });

    try {
      await model.delete('102');
    } catch (e: any) {
      expect(e.message).to.be.deep.eq(ErrorTypes.InvalidMongoId);
    }
  });
});