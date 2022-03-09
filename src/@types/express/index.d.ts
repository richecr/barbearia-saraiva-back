declare module Express {
    export interface Request {
        user: {
            id: number | undefined;
        };
    }
}