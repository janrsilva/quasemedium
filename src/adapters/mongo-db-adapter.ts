import { Db, FilterQuery, MongoClient, ObjectId } from 'mongodb';
import { IDBConnection } from '../interfaces/db-connection-interface';
import { DBRepository, Params } from '../interfaces/db-repository';

export class MongoDBAdapter implements DBRepository, IDBConnection {
    private mongoClient: MongoClient;

    constructor(public collection: string = null) {}

    get db(): Db {
        return this.mongoClient.db();
    }

    async connect() {
        const host = process.env.MONGO_HOST || 'localhost';
        const port = process.env.MONGO_PORT || '27017';
        const database = process.env.MONGO_DATABASE || 'quasemedium';
        const url = process.env.MONGO_URL || process.env.DATABASE_URL || `mongodb://${host}:${port}/${database}`;
        try {
            if (!this.mongoClient) {
                this.mongoClient = await MongoClient.connect(
                    url,
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    }
                ).catch(
                    (e) => {
                        throw e;
                    }
                )
            }
        } catch (error) {
            console.log('error during connecting to mongo: ');
            console.error(error);
        }
    }

    create<T>(obj: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.collection(this.collection).insertOne(obj, (error, result: any) => {
                if (this.isSuccess(error, result)) {
                    resolve(this.getResultObj(result));
                } else {
                    reject(error);
                }
            });
        });
    }

    update<T>(_id: string, obj: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.collection(this.collection).updateOne(
                this.queryOne(_id),
                {$set: obj},
                (error, result: any) => {
                    if (this.isSuccess(error, result)) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
        });
    }

    delete(_id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.collection(this.collection).deleteOne(this.queryOne(_id), (error: any, result: any) => {
                if (result) {
                    resolve(true);
                } else {
                    reject(error);
                }
            });
        });
    }

    get<T>(_id: string): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            const result = await this.db.collection(this.collection).find(this.queryOne(_id)).limit(1).toArray();
            resolve(result[0]);
        });
    }

    list<T>(params: Params): Promise<T[]> {
        // tslint:disable-next-line: no-shadowed-variable
        let query = {} as FilterQuery<any>;
        Object.keys(params).forEach((key) => {
            query = {...query, ...this.queryBy(key, params[key])};
        });
        return new Promise<T[]>(async (resolve, reject) => {
            const result = await this.db.collection<T>(this.collection).find(query).toArray();
            resolve(result);
        });
    }

    getByKey<T>(key: string, value: string): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            const result = await this.db.collection(this.collection).find(
                this.queryBy(key, value)
            ).limit(1).toArray();
            resolve(result[0]);
        });
    }

    isSuccess(error: any, result: any) {
        return !error && result;
    }

    getResultObj(result: any) {
        return result.ops[0];
    }

    queryOne(_id: string): FilterQuery<any> {
        return {_id: new ObjectId(_id)} as FilterQuery<any>;
    }

    queryBy(key: string, value: any): FilterQuery<any> {
        return {[key]: value} as FilterQuery<any>;
    }
}