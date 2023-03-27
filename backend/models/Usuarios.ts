import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'
import db from "../config/db";

const Usuario = db.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    confirmado: {
        type: DataTypes.STRING,
        defaultValue: 0
    }
}, {
    hooks: {
        beforeSave: async function(usuario: typeof Usuario) {
            if(usuario.changed('password')) {
              const previousUsuario = usuario.previous();
              if (previousUsuario.password !== usuario.password) {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
              }
            }
        }
    },
})

// Métodos personalizados
Usuario.prototype.verificarPassword = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
}

export default Usuario