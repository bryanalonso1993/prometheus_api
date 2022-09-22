import connection from "../connection";
import { DataTypes, Model } from "sequelize";

class Interface extends Model {
    declare ipAddress: string;
    declare interface: string;
    declare max: number;
    declare min: number;
    declare endpoint: string;
    declare medicion: string;
    declare uid: string;
}

Interface.init({
    ipAddress: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    interface: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    max: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    min: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    endpoint: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    medicion: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    }
},{
    freezeTableName: true,
    tableName: 'interface',
    sequelize: connection
});

export default Interface;
