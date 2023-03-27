import { DataTypes } from "sequelize";
import Usuario from "./Usuarios.js";
import Cliente from "./Clientes.js";
import db from "../config/db.js";

const AbonoCliente = db.define('AbonosClientes', {
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
    clienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Clientes',
            key: 'id'
        }
    }
})

AbonoCliente.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
AbonoCliente.belongsTo(Cliente, { foreignKey: 'clienteId', onDelete: 'CASCADE'});

export default AbonoCliente