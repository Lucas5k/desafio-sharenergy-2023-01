import { Router } from 'express';
import Model from '../models/User';
import Service from '../services/login.services';
import Controller from '../controller/login.controller';

const model = new Model();
const service = new Service(model);
const controller = new Controller(service);

const route = Router();

route.post('/login', (req, res) => controller.login(req, res));
route.post('/create', (req, res) => controller.create(req, res));

export default route;

