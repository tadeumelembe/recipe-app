import { UserDraft } from "../../../domain/repositories/IUserRepository";
import { toUserDocData, toUserEntity } from "../userMapper";

describe("userMapper", () => {
    describe("toUserEntity", () => {
        it("maps a Firestore doc to a User", () => {
            const snap = {
                id: "u1",
                data: () => ({
                    name: "Tadeu Melembe",
                    email: "tadeu@example.com",
                    avatarUrl: null,
                }),
            } as any;

            const user = toUserEntity(snap);

            expect(user).toEqual({
                id: "u1",
                name: "Tadeu Melembe",
                email: "tadeu@example.com",
                avatarUrl: null,
            });
        });

        it("defaults missing fields to null", () => {
            const snap = { id: "u1", data: () => ({}) } as any;

            const user = toUserEntity(snap);

            expect(user).toEqual({ id: "u1", name: null, email: null, avatarUrl: null });
        });
    });

    describe("toUserDocData", () => {
        it("maps a UserDraft to Firestore doc data", () => {
            const draft: UserDraft = {
                id: "u1",
                name: "Tadeu Melembe",
                email: "tadeu@example.com",
                avatarUrl: null,
            };

            expect(toUserDocData(draft)).toEqual({
                name: "Tadeu Melembe",
                email: "tadeu@example.com",
                avatarUrl: null,
            });
        });
    });
});
