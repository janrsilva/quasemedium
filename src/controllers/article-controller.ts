import { BaseController } from "./base-controller";
import { NextApiRequest, NextApiResponse } from "next";
import { ArticleService } from "../services/article-service";
import { ArticleRepository } from "../repositories/article-repository";
import { Article } from "../interfaces/article";

export class ArticleController extends BaseController {
    private service: ArticleService;

    constructor(
        protected req: NextApiRequest,
        protected res: NextApiResponse<Article>
    ) {
        super(req, res);
    }

    init() {
        this.service = new ArticleService(
            new ArticleRepository(this.db)
        )
    }

    async get() {
        if (!this.session) {
            return this.res.status(403);
        }
        const {
            query: { id },
        } = this.req;
        return this.res.status(200).json(await this.service.get(id as string))
    }

    async post() {
        if (!this.session) {
            return this.res.status(403);
        }
        const article = await this.service.create(this.req.body)
        return this.res.status(201).json(await this.service.get(article._id))
    }

    async patch() {
        if (!this.session) {
            return this.res.status(403);
        }
        const id = this.req.query.id as string;
        await this.service.update(id, this.req.body)
        return this.res.status(200).json(await this.service.get(id))
    }

    async delete() {
        return Promise.resolve();
    }
}