import { Article } from "../interfaces/article";
import { ArticleRepository } from "../repositories/article-repository";

export class ArticleService {
    articleRepo: ArticleRepository;

    constructor (articleRepo: ArticleRepository) {
        this.articleRepo = articleRepo;
    }

    create(article: Article): Promise<Article> {
        article.createdAt = new Date();
        article.updatedAt = article.createdAt;
        return this.articleRepo.create(article);
    }

    get(uuid: string): Promise<Article>  {
        return this.articleRepo.get(uuid);
    }

    update(uuid: string, article: Article): Promise<Article> {
        delete article._id;
        article.updatedAt = new Date();
        return this.articleRepo.update(uuid, article);
    }

    getByName(name: string): Promise<Article>  {
        return this.articleRepo.getByKey('name', name);
    }
}