import * as chai from 'chai';
import * as Sinon from 'sinon';
import Model from '../../../models/User';
import Service from '../../../services/login.services';
import Controller from '../../../controller/login.controller';
import ErrorTypes from '../../../errors/catalog';
import { Request, Response } from 'express';
import { LoginMock, CreateMock } from '../../Mocks/LoginMock';
import { expect } from 'chai';


describe('#ControllerLogin', () => {
  const model = new Model();
  const service = new Service(model);
  const controller = new Controller(service);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(async () => {
    Sinon.stub(service, 'login').resolves();
    Sinon.stub(service, 'create').resolves(CreateMock);

    res.status = Sinon.stub().returns(res);
    res.sendStatus = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  afterEach(async () => {
    Sinon.restore();
  });

  describe('#login', () => {
    it("verifica se o retorno é uma string, com a messagem 'login sucess'", async () => {
      req.body = LoginMock;

      await controller.login(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
    });

    it("verifica se ao mandar dados invalidos, se retorna um status 401 e 'incorrect username or password!'", async () => {
      Sinon.restore();
      Sinon.stub(service, 'login').rejects({ message: ErrorTypes.IncorrectName, status: 401 });

      try {
        req.body = { username: 'batatinha', password: '1234' };

        await controller.login(req, res);
      } catch (e: any) {

        expect(e.status).to.be.deep.equal(401);
        expect(e.message).to.be.deep.equal(ErrorTypes.IncorrectName);
      }
    });
  });

  describe('#create', () => {
    it('ao criar elementos, se retorna um status 201 e o elemento criado', async () => {
      req.body = LoginMock;

      await controller.create(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(CreateMock)).to.be.true;
    });

    it("ao mandar elementos errados errados, se o status é 409 'user already exists'", async () => {
      Sinon.restore();
      Sinon.stub(service, 'create').rejects({ message: ErrorTypes.IncorrectName, status: 409 });

      try {
        req.body = { username: 'batatinha', password: '1234' };

        await controller.create(req, res);
      } catch (e: any) {

        expect(e.status).to.be.deep.equal(409);
        expect(e.message).to.be.deep.equal(ErrorTypes.IncorrectName);
      }
    });
  });
});