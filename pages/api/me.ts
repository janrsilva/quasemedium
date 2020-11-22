import { NextApiRequest, NextApiResponse } from 'next'
import { AccountController } from '../../src/controllers/account-controller';
import { DBFactory } from '../../src/factories/db-factory';
import { User } from '../../src/interfaces/user';

export default async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const db = DBFactory.build(process.env.DB_DRIVER);
  await db.connect();
  const controller = new AccountController(db, req, res);
  return controller.resolve();
}
