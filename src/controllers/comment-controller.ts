import { BaseController } from "./base-controller";
import { NextApiRequest, NextApiResponse } from "next";
import { ArticleService } from "../services/article-service";
import { ArticleRepository } from "../repositories/article-repository";
import { Comment } from "../interfaces/article";

export class CommentController extends BaseController {
    private service: ArticleService;

    constructor(
        protected req: NextApiRequest,
        protected res: NextApiResponse<Comment>
    ) {
        super(req, res);
    }

    init() {
        this.service = new ArticleService(
            new ArticleRepository(this.db)
        )
    }

    async get() {}

    async post() {
        if (!this.session) {
            return this.res.status(403);
        }
        const {
            query: {id}
        } = this.req;
        const article = await this.service.get(id as string);

        const comment = {
            likes: [],
            dislikes: [],
            user: this.session.user,
            text: this.req.body.text,
            createdAt: new Date()
        }

        article.comments = article.comments || [];
        article.comments.push(comment as Comment);
        await this.service.update(id as string, article);
        return this.res.status(201).json(comment as Comment)
    }

    async patch() {}

    async delete() {}
}