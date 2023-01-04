import { Router } from 'express';
import Model from '../models/Register';
import Service from '../services/register.services';
import Controller from '../controller/register.controller';

const model = new Model();
const service = new Service(model);
const controller = new Controller(service);

const route = Router();

route.get('/registers', (req, res) =>  controller.read(req, res));
route.get('/register/:id', (req, res) => controller.readOne(req, res));
route.post('/register', (req, res) => controller.create(req, res));
route.put('/register/:id', (req, res) => controller.update(req, res));
route.delete('/register/:id', (req, res) => controller.delete(req, res));

export default route;
