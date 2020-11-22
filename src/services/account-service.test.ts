import { User } from "../interfaces/user";
import { AccountRepository } from "../repositories/account-repository";
import { AccountService } from "./account-service";

describe("update account business rule", () => {
    it("should set createdAt property", async () => {
        const service = new AccountService({
            create(user: User): Promise<User> {
                const mock = jest.fn(() => Promise.resolve(user))
                return mock();
            }
        } as AccountRepository)
        const user = await service.create({} as User);
        expect(user.createdAt).toBeDefined()
        expect(user.updatedAt).toBeDefined()
    });
    it("should set updatedAt property", async () => {
        const service = new AccountService({
            update(_id: string, user: User): Promise<User> {
                const mock = jest.fn(() => Promise.resolve(user))
                return mock();
            }
        } as AccountRepository)
        const user = await service.update('abc', {} as User);
        expect(user.updatedAt).toBeDefined()
    });
})