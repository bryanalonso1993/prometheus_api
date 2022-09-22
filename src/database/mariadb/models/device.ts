import connection from "../connection";
import { DataTypes, Model } from "sequelize";

class Device extends Model {
    declare deviceName: string;
    declare ipAddress: string;
    declare category: string;
    declare monitoring: string;
    declare register: string;
    declare enable: number;
}

Device.init({
    deviceName:{
        type: DataTypes.STRING(255),
        allowNull: true
    },
    ipAddress: {
        type: DataTypes.STRING(16),
        unique: true,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    monitoring: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    register: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    enable: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    }},
    {
        freezeTableName: true,
        tableName: 'device',
        sequelize: connection
});

export default Device;



