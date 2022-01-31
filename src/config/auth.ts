import 'dotenv/config';

const secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : "6e8c785c6649cf719735f422b84c63d3";

export default {
    jwt: {
        secret,
        expiresIn: '1d',
    },
};
