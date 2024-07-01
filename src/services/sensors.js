import { addMeasureSchema } from '../controllers/schemas/add-measure.js';
import { SensorRepository } from '../model/DAOs/sensor.repo.js';

export class SensorService {
  constructor() {
    this.repo = new SensorRepository();
  }

  addMeasure = async (measure) => {
    const { error } = addMeasureSchema.validate(measure);

    if (error) {
      throw {
        error: 'Datos no validos',
        type: 'ValidationError',
      };
    }

    const sensor = await this.repo.getSensorById(measure.id);

    if (!sensor) {
      await this.repo.addSensor(measure.id);
    }

    const measureWithDate = {
      ...measure,
      date: new Date(),
    };

    const addedMeasure = await this.repo.addMeasure(measureWithDate);

    return addedMeasure;
  };

  getSensors = async () => {
    const sensors = await this.repo.getSensors();
    return sensors.map(({ _id, measures }) => ({
      id: _id,
      measures,
    }));
  };

  getSensorById = async (id) => {
    const sensor = await this.repo.getSensorById(id);

    if (!sensor) {
      throw {
        error: 'Numero de sonda incorrecto',
        type: 'NotFoundError',
      };
    }

    const { _id, measures } = sensor;

    return {
      id: _id,
      measures,
    };
  };

  getMetrics = async () => {
    const sensors = await this.repo.getSensors();

    const averageBySensor = sensors.map((sensor) => {
      const totalMeasures = sensor.measures.length;
      const sum = sensor.measures.reduce(
        (acc, measure) => acc + measure.temperature,
        0
      );
      return {
        id: sensor._id,
        quantity: totalMeasures,
        average: sum / totalMeasures,
      };
    });

    const totalMeasures = sensors.reduce(
      (acc, sensor) => acc + sensor.measures.length,
      0
    );

    return {
      cantidadTotal: totalMeasures,
      temperaturaSondas: averageBySensor,
    };
  };
}
