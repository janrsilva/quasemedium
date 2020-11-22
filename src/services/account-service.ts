import { User } from "../interfaces/user";
import { AccountRepository } from "../repositories/account-repository";

export class AccountService {
    userRepo: AccountRepository;

    constructor (userRepo: AccountRepository) {
        this.userRepo = userRepo;
    }

    create(user: User): Promise<User> {
        user.createdAt = new Date();
        user.updatedAt = user.createdAt;
        return this.userRepo.create(user);
    }

    get(uuid: string): Promise<User>  {
        return this.userRepo.get(uuid);
    }

    update(uuid: string, user: User): Promise<User> {
        delete user._id;
        user.updatedAt = new Date();
        return this.userRepo.update(uuid, user);
    }

    getByEmail(email: string): Promise<User>  {
        return this.userRepo.getByKey('email', email);
    }
}