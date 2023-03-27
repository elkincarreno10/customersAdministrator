import { DataTypes } from "sequelize";
import Usuario from "./Usuarios.js";
import db from "../config/db.js";

const Campesino = db.define('Campesinos', {
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

Campesino.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });

export default Campesino