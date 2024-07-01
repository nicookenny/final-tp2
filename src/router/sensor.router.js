import Router from 'express';
import { SensorController } from '../controllers/sensor.controller.js';

export class SensorRouter {
  constructor() {
    this.router = Router();
    this.controller = new SensorController();
  }

  initialize() {
    this.router.post('/', this.controller.addMeasure);
    this.router.get('/', this.controller.getSensors);
    this.router.get('/metrics', this.controller.getMetrics);
    this.router.get('/:id', this.controller.getSensorById);

    return this.router;
  }
}
