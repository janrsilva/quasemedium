import { DBRepository, Params } from '../interfaces/db-repository';
import { Article } from '../interfaces/article';

export class ArticleRepository {
    db: DBRepository;

    constructor (db: DBRepository) {
        this.db = db;
        this.db.collection = 'articles';
    }

    create(article: Article): Promise<Article> {
        return this.db.create<Article>(article);
    }

    get(_id: string): Promise<Article>  {
        return this.db.get<Article>(_id);
    }

    list(filter: Params = {}): Promise<Article[]>  {
        return this.db.list<Article>({filter});
    }

    update(_id: string, article: Article): Promise<Article> {
        return this.db.update<Article>(_id, article);
    }

    delete(_id: string): Promise<boolean>  {
        return this.db.delete(_id);
    }

    getByKey(key: string, value: string): Promise<Article>  {
        return this.db.getByKey<Article>(key, value);
    }
}