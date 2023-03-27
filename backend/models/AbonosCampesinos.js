import { DataTypes } from "sequelize";
import Usuario from "./Usuarios.js";
import Campesino from "./Campesinos.js";
import db from "../config/db.js";

const AbonoCampesino = db.define('AbonosCampesinos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    saldo: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: new Date(Date.now())
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuarios',
            key: 'id'
        }
    },
    campesinoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Campesinos',
            key: 'id'
        }
    }
})

AbonoCampesino.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
AbonoCampesino.belongsTo(Campesino, { foreignKey: 'campesinoId', onDelete: 'CASCADE'});

export default AbonoCampesino