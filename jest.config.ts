module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '@test/(.*)': '<rootDir>/__tests__/$1',
        '@core/(.*)': '<rootDir>/',
        '@controllers/(.*)': '<rootDir>/src/app/controllers/$1',
        '@models/(.*)': '<rootDir>/src/app/models/$1',
        '@dto/(.*)': '<rootDir>/src/app/dto/$1',
        '@repositories/(.*)': '<rootDir>/src/app/repository/$1',
        '@middlewares/(.*)': '<rootDir>/src/app/middlewares/$1',
        '@config/(.*)': '<rootDir>/src/config/$1',
        '@database/(.*)': '<rootDir>/src/database/$1',
    },
};
