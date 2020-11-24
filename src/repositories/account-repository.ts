import { DBRepository, Params } from '../interfaces/db-repository';
import { User } from '../interfaces/user';

export class AccountRepository {
    db: DBRepository;

    constructor (db: DBRepository) {
        this.db = db;
        this.db.collection = 'users';
    }

    create(user: User): Promise<User> {
        return this.db.create<User>(user);
    }

    get(_id: string): Promise<User>  {
        return this.db.get<User>(_id);
    }

    list(filter: Params = {}): Promise<User[]>  {
        return this.db.list<User>({filter});
    }

    update(_id: string, user: User): Promise<User> {
        return this.db.update<User>(_id, user);
    }

    delete(_id: string): Promise<boolean>  {
        return this.db.delete(_id);
    }

    getByKey(key: string, value: string): Promise<User>  {
        return this.db.getByKey<User>(key, value);
    }
}