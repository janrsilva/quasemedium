import { NextApiRequest, NextApiResponse } from 'next'
import { AccountController } from '../../src/controllers/account-controller';
import { User } from '../../src/interfaces/user';

export default async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const controller = new AccountController(req, res);
  return controller.resolve();
}
