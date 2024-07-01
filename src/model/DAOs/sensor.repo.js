import { Database } from '../Database.js';

export class SensorRepository {
  constructor() {
    const { db } = Database;
    this.repo = db.collection('sensors');
  }

  addMeasure = async (measure) => {
    const { id, ...data } = measure;

    await this.repo.updateOne(
      { _id: id },
      {
        $push: {
          measures: {
            $each: [data],
            $sort: { date: -1 },
          },
        },
      }
    );

    return {
      ...data,
      id,
    };
  };

  addSensor = async (id) => {
    const inserted = await this.repo.insertOne({
      _id: id,
      measures: [],
    });
    return inserted;
  };

  getSensorById = async (id) => {
    const sensor = await this.repo.findOne({ _id: Number(id) });
    return sensor;
  };

  getSensors = async () => {
    const sensors = await this.repo.find().toArray();
    return sensors;
  };
}
