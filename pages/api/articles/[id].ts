import { NextApiRequest, NextApiResponse } from 'next'
import { ArticleController } from '../../../src/controllers/article-controller';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const controller = new ArticleController(req, res);
    return controller.resolve();
}