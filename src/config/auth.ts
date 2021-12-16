import 'dotenv/config';

const secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : "";

export default {
    jwt: {
        secret,
        expiresIn: '1d',
    },
};
