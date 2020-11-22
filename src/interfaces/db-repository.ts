export interface Params { [key: string]: any; }

export interface DBRepository {
    collection: string;
    create<T>(obj: T): Promise<T>;
    update<T>(uuid: string, obj: T): Promise<T>;
    delete(uuid: string): Promise<boolean>;
    get<T>(uuid: string): Promise<T>;
    list<T>(params: Params, page?: number, perPage?: number): Promise<T[]>;
    getByKey<T>(key: string, value: string): Promise<T>;
}

export interface MongoDBRepository {
    collecttion: string;
    create<T>(obj: T, collection: string): Promise<T>;
    update<T>(uuid: string, obj: T, collection: string): Promise<T>;
    delete(uuid: string, collection: string): Promise<boolean>;
    get<T>(uuid: string, collection: string): Promise<T>;
    list<T>(params: Params, collection: string, page?: number, perPage?: number): Promise<T[]>;
    getByKey<T>(key: string, value: string, collection: string): Promise<T>;
}
