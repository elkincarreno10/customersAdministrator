import { DataTypes } from "sequelize";
import Usuario from "./Usuarios";
import Campesino from "./Campesinos";
import db from "../config/db";

const FacturaCampesino = db.define('FacturasCampesinos', {
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
    estado: {
        type:DataTypes.TINYINT,
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

FacturaCampesino.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
FacturaCampesino.belongsTo(Campesino, { foreignKey: 'campesinoId', onDelete: 'CASCADE'});

export default FacturaCampesino