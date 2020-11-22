import { MongoDBAdapter } from "../adapters/mongo-db-adapter";

export enum DBDriver {
    MONGO = 'mongo',
    OTHER = 'others-implements',
}

export class DBFactory {

    static build(driver: string = DBDriver.MONGO) {
        switch (driver) {
            case 'mongo' : {
                return new MongoDBAdapter();
            }
            case 'others-implements' : {
                return null;
            }
        }
    }
}