import { ENV, Config } from "../interface/config.interface";
/**
 * Importar las variables de entorno
 */
import dotenv from 'dotenv';

const result = dotenv.config({ path: './src/config/.env' });

if ( result.error ) throw result.error;

const getConfig = ():ENV => {
    return {
        PORT: process.env.PORT,
        MONGODB_SERVER: process.env.MONGODB_SERVER,
    }
}

const getSanitzedConfig = ( config:ENV ):Config => {
    for ( const [key, value] of Object.entries(config) ) {
        if ( value === undefined ) {
            throw new Error(`Missing key ${ key } in config.env`);
        }
    }
    return config as Config;
}

const config = getConfig();

const sanitzedConfig = getSanitzedConfig(config);

export default sanitzedConfig;

