import { NextApiRequest, NextApiResponse } from 'next'
import { CommentController } from '../../../../src/controllers/comment-controller';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const controller = new CommentController(req, res);
    return controller.resolve();
}