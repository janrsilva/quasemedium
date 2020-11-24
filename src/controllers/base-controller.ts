import { NextApiRequest, NextApiResponse } from "next";
import { Session, getSession } from "next-auth/client";
import { DBFactory } from "../factories/db-factory";
import { DBRepository } from "../interfaces/db-repository";

export abstract class BaseController {
    session: Session;
    static _db: DBRepository;

    public get db() {
        return BaseController._db;
    }

    public set db(db: DBRepository) {
        BaseController._db = db;
    }

    constructor(protected req: NextApiRequest, protected res: NextApiResponse<any>) {
        //@todo entender pq o req e res estão ficando undefined
        this.req = req;
        this.res = res;
    }

    async resolve() {
        this.session = await getSession({ req: this.req }) as Session;
        if (!this.db) {
            const db = DBFactory.build(process.env.DB_DRIVER);
            await db.connect();
            this.db = db as DBRepository;
        }

        this.init();

        try {
            switch(this.req.method) {
                case "POST":
                    return this.post();
                case "PATCH":
                    return this.patch();
                case "DELETE":
                    return this.delete();
                case "GET":
                    return this.get();
                default:
                    return this.res.status(405);
            }
        } catch(e) {
            console.error(e);
        }
    }

    abstract init(): void;
    abstract get(): void;
    abstract post(): void;
    abstract patch(): void;
    abstract delete(): void;
}
