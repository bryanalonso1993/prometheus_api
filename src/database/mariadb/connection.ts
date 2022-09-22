import { Sequelize } from "sequelize";
import sanitzedConfig from "../../config/config";

const connection = new Sequelize(sanitzedConfig.MARIADB_DATABASE, sanitzedConfig.MARIADB_USERNAME,sanitzedConfig.MARIADB_PASSWORD, {
    host: sanitzedConfig.MARIADB_SERVER,
    dialect: sanitzedConfig.MARIADB_ENGINE,
    port: +sanitzedConfig.MARIADB_PORT,
    timezone: 'America/Lima',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
});

export default connection;
