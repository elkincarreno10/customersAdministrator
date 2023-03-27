import { DataTypes } from "sequelize";
import Usuario from "./Usuarios";
import db from "../config/db";

const Cliente = db.define('Clientes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    saldo: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuarios',
            key: 'id'
        }
    }
})

Cliente.belongsTo(Usuario, { foreignKey: 'usuarioId' });

export default Cliente