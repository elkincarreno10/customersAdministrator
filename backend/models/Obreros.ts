import { DataTypes } from "sequelize";
import Usuario from "./Usuarios";
import db from "../config/db";

const Obrero = db.define('Obreros', {
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

Obrero.belongsTo(Usuario, { foreignKey: 'usuarioId' });

export default Obrero