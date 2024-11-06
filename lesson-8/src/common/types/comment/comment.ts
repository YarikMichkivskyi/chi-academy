export type CommentT = {
    id: string;
    user: { username: string, id: number };
    text: string;
    createdAt: Date;
};