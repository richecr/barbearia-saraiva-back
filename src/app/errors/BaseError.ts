class BaseError extends Error {
    public statusCode: number;

    constructor(description: string, statusCode: number) {
        super(description);
        this.statusCode = statusCode;
    }
}

export default BaseError;
