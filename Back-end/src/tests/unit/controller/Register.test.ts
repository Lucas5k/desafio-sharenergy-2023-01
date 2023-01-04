import * as chai from 'chai';
import * as Sinon from 'sinon';
import Model from '../../../models/Register';
import Service from '../../../services/register.services';
import Controller from '../../../controller/register.controller';
import { Request, Response } from 'express';
import { RegisterMock, RegisterCreate } from '../../Mocks/RegisterMock';
import { expect } from 'chai';
import ErrorTypes from '../../../errors/catalog';


describe('#ControllerRegister', () => {
  const model = new Model();
  const service = new Service(model);
  const controller = new Controller(service);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(async () => {
    Sinon.stub(service, 'read').resolves([RegisterMock]);
    Sinon.stub(service, 'readOne').resolves(RegisterCreate);
    Sinon.stub(service, 'update').resolves(RegisterCreate);
    Sinon.stub(service, 'create').resolves(RegisterCreate);
    Sinon.stub(service, 'delete').resolves();

    res.status = Sinon.stub().returns(res);
    res.sendStatus = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  afterEach(async () => {
    Sinon.restore();
  });

  describe('#read', () => {
    it("verifica ao fazer a chamada get, se retorna o status 200", async () => {
      req.body = {};

      await controller.read(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
    });
  });

  describe('#readOne', () => {
    it('verifica ao mandar dados corretos, se ele retorna o elemento', async () => {
      req.params = { _id: RegisterCreate._id };
      await controller.readOne(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(RegisterCreate)).to.be.true;
    });

    it("verifica se ao mandar dados invalidos, se retorna um status 404 e 'Object not found'", async () => {
      Sinon.restore();
      Sinon.stub(service, 'readOne').rejects({ message: ErrorTypes.idInvalid, status: 404 });

      try {
        req.params = { _id: '102' };
        await controller.readOne(req, res);
      } catch (e: any) {

        expect(e.status).to.be.deep.equal(404);
        expect(e.message).to.be.deep.equal(ErrorTypes.idInvalid);
      }
    });
  });

  describe('#update', () => {
    it('verifica ao mandar dados corretos para atualizar, se ele retorna o elemento', async () => {
      req.params = { _id: RegisterCreate._id };
      req.body = RegisterCreate;
      await controller.update(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(RegisterCreate)).to.be.true;
    });

    it("verifica se ao mandar dados invalidos, se retorna um status 404 e 'Object not found'", async () => {
      Sinon.restore();
      Sinon.stub(service, 'update').rejects({ message: ErrorTypes.idInvalid, status: 404 });

      try {
        req.params = { _id: '102' };
        await controller.update(req, res);
      } catch (e: any) {

        expect(e.status).to.be.deep.equal(404);
        expect(e.message).to.be.deep.equal(ErrorTypes.idInvalid);
      }
    });
  });

  describe('#create', () => {
    it('verifica se ao mandar no body, dados corretos se retorna corretamente.', async () => {
      req.body = RegisterMock;

      await controller.create(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(RegisterCreate)).to.be.true;
    });

    it("verifica se ao mandar no body vazio, se retorna o status 400 e a message: 'the object must not be empty'", async () => {
      Sinon.restore();
      Sinon.stub(service, 'create').rejects({ message: ErrorTypes.EmptyObject, status: 400 });

      try {
        req.body = { };

        await controller.create(req, res);
      } catch (e: any) {
        expect(e.message).to.be.deep.equal(ErrorTypes.EmptyObject);
        expect(e.status).to.be.deep.equal(400);
      }
    });

    it("ao mandar elementos errados errados, se o status é 409 'data already exists'", async () => {
      Sinon.restore();
      Sinon.stub(service, 'create').rejects({ message: ErrorTypes.IncorrectData, status: 409 });

      try {
        req.body = {
          name: 'batatinha',
          email: 'Lucas123@hotmal.com',
          telephone: '00000000011',
          address: "avenida brasil 123",
          cpf: "00000000011"
        };

        await controller.create(req, res);
      } catch (e: any) {

        expect(e.status).to.be.deep.equal(409);
        expect(e.message).to.be.deep.equal(ErrorTypes.IncorrectData);
      }
    });
  });

  describe('#delete', () => {
    it("se mandar um id correto, se retorna um status 204", async () => {
      req.params = { _id: RegisterCreate._id };

      await controller.delete(req, res);

      expect((res.sendStatus as Sinon.SinonStub).calledWith(204)).to.be.true;
    });

    it("ao mandar um id incorreto se retorna um erro 404 e a message: 'Object not found'", async () => {
      Sinon.restore();
      Sinon.stub(service, 'delete').rejects({ message: ErrorTypes.idInvalid, status: 404 });

      try {
        req.params = { _id: '1020' };

        await controller.delete(req, res);
      } catch (e:any) {

        expect(e.message).to.be.deep.equal(ErrorTypes.idInvalid);
        expect(e.status).to.be.deep.equal(404);
      }
    });
  });
});