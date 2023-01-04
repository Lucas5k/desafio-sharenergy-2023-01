import Modell from '../../../models/User';
import * as Sinon from 'sinon';
import { Model } from 'mongoose';
import { LoginMock, CreateMock } from '../../Mocks/LoginMock';
import chai from 'chai';
const { expect } = chai;

describe('#ModelLogin', () => {
  const model = new Modell();

  before(async () => {
    Sinon.stub(Model, 'create').resolves(CreateMock);
    Sinon.stub(Model, 'find').resolves([LoginMock]);
  });

  after(async () => {
    Sinon.restore();
  })

  describe('#create', () => {
    it('criando elementos', async () => {
      const result = await model.create(LoginMock);

      expect(result).to.be.deep.equal(CreateMock);
    });
  });

  describe('#login', () => {
    it('fazendo login', async () => {
      const result = await model.read();

      expect(result).to.be.deep.equal([LoginMock]);
    });
  });
});