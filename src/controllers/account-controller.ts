import { BaseController } from "./base-controller";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../interfaces/user";
import { AccountService } from "../services/account-service";
import { AccountRepository } from "../repositories/account-repository";
import { DBRepository } from "../interfaces/db-repository";

export class AccountController extends BaseController {
    private service: AccountService;

    constructor(
        db: DBRepository,
        protected req: NextApiRequest,
        protected res: NextApiResponse<User>
    ) {
        super(req, res);
        this.service = new AccountService(
            new AccountRepository(db)
        )
    }

    async get() {
        if (!this.session) {
            return this.res.status(403);
        }
        const user = await this.service.getByEmail(this.session.user.email);
        return this.res.status(200).json(await this.service.get(user._id))
    }

    async post() {

    }

    async patch() {
        if (!this.session) {
            return this.res.status(403);
        }
        const user = await this.service.getByEmail(this.session.user.email);
        await this.service.update(user._id, this.req.body)
        return this.res.status(200).json(await this.service.get(user._id))
    }

    async delete() {

    }
}