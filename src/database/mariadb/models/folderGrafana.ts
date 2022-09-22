import connection from "../connection";
import { DataTypes, Model } from "sequelize";

class FolderGrafana extends Model {
    declare identificador: number;
    declare uid: string;
    declare title: string;
    declare url: string;
}

FolderGrafana.init({
    identificador: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    uid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false
    }},
    {
    freezeTableName: true,
    tableName: 'foldergrafana',
    sequelize: connection
});

export default FolderGrafana;
