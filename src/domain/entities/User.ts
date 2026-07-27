export type UserId = string;

export interface User {
    id: UserId;
    name: string | null;
    email: string | null;
    avatarUrl: string | null;
}
