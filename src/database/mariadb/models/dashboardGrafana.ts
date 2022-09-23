import connection from "../connection";
import { DataTypes, Model } from "sequelize";

class DashboardGrafana extends Model {
    declare identificador: string;
    declare slug: string;
    declare status: string;
    declare uid: string;
    declare url: string;
    declare version: number;
}

DashboardGrafana.init({
    identificador: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    url : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    version: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    }},
    {
        freezeTableName: true,
        tableName: 'dashboardgrafana',
        sequelize: connection
    }
);

export default DashboardGrafana;
