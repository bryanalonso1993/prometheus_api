export interface ENV {
    PORT: string | undefined ;
    MONGODB_SERVER: string | undefined;
    GLOBAL_PREFIX: string | undefined;
}

export interface Config {
    PORT: string;
    MONGODB_SERVER: string;
    GLOBAL_PREFIX: string;
}
