import { NextApiRequest, NextApiResponse } from "next";
import { Session, getSession } from "next-auth/client";

export abstract class BaseController {
    session: Session;

    constructor(protected req: NextApiRequest, protected res: NextApiResponse<any>) {}

    async resolve() {
        this.session = await getSession({ req: this.req }) as Session;

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
    }

    abstract get(): void;
    abstract post(): void;
    abstract patch(): void;
    abstract delete(): void;
}
