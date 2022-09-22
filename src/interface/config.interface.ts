export interface ENV {
    PORT: string | undefined;
    MONGODB_SERVER: string | undefined;
    GLOBAL_PREFIX: string | undefined;
    MARIADB_SERVER: string | undefined;
    MARIADB_ENGINE: string | undefined;
    MARIADB_USERNAME: string | undefined;
    MARIADB_PASSWORD: string | undefined;
    MARIADB_DATABASE: string | undefined;
    MARIADB_PORT: number | any;
    APM_SERVER: string | undefined;
    PROMETHEUS_SERVER: string | undefined;
    SEED: string | undefined;
    USERNAME_API: string | undefined;
    PASSWORD_API: string | undefined;
}

export interface Config {
    PORT: string;
    MONGODB_SERVER: string;
    GLOBAL_PREFIX: string;
    MARIADB_SERVER: string;
    MARIADB_ENGINE: 'mariadb' | 'mysql';
    MARIADB_USERNAME: string;
    MARIADB_PASSWORD: string;
    MARIADB_DATABASE: string;
    MARIADB_PORT: number;
    APM_SERVER: string;
    PROMETHEUS_SERVER: string;
    SEED: string;
    USERNAME_API: string;
    PASSWORD_API: string;
}
