import { SensorService } from '../services/sensors.js';

export class SensorController {
  constructor() {
    this.service = new SensorService();
  }

  addMeasure = async (req, res) => {
    try {
      const { body } = req;
      const measure = await this.service.addMeasure(body);

      res.json(measure);
    } catch (error) {
      switch (error?.type) {
        case 'ValidationError':
          return res.status(400).json({ errorMsg: error.error });
        default:
          res.status(500).json({ errorMsg: error.message });
      }
    }
  };

  getSensors = async (req, res) => {
    try {
      const sensors = await this.service.getSensors();
      res.json(sensors);
    } catch (error) {
      switch (error?.type) {
        case 'NotFoundError':
          return res.status(404).json({ error: error.error });
        default:
          res.status(500).json({ error: error.message });
      }
    }
  };

  getSensorById = async (req, res) => {
    try {
      const { id } = req.params;
      const sensor = await this.service.getSensorById(id);
      res.json(sensor);
    } catch (error) {
      switch (error?.type) {
        case 'NotFoundError':
          return res.status(404).json({ error: error.error });
        default:
          res.status(500).json({ error: error.message });
      }
    }
  };

  getMetrics = async (req, res) => {
    try {
      const metrics = await this.service.getMetrics();
      res.json({ metrics });
    } catch (error) {
      switch (error?.type) {
        case 'ValidationError':
          return res.status(400).json({ error: error.error });
        default:
          res.status(500).json({ error: error.message });
      }
    }
  };

  // TO - DO
  updateSensor = async (req, res) => {
    throw new Error('Method not implemented');
  };

  // TO - DO
  deleteSensor = async (req, res) => {
    throw new Error('Method not implemented');
  };
}
