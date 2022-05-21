export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            QNT_SERVICES_TO_DISCOUNT: number;
        }
    }
}
