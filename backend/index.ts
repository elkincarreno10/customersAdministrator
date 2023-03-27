import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import db from "./config/db";
import loginRoutes from './routes/loginRoutes'
import clientesRoutes from './routes/clientesRoutes'
import campesinosRoutes from './routes/campesinosRoutes'
import obrerosRoutes from './routes/obrerosRoutes'

process.env.TZ = 'America/Bogota';
const app = express()
dotenv.config()

// Habilitar el envio de json
app.use(express.json())

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            // Puede consultar la API
            callback(null, true)
        } else {
            // NO PERMITIDO POR CORS
            callback(new Error('Error de cors'))
        }
    }
}
app.use(cors(corsOptions))

app.use('/', loginRoutes)
app.use('/clientes', clientesRoutes)
app.use('/campesinos', campesinosRoutes)
app.use('/obreros', obrerosRoutes)


// Verificar que la db está conectada correctamente
try {
    db.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    })
    db.sync()
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const port = process.env.PORT ?? 4000
app.listen(port, () => console.log(`Servidor corriendo en el puerto 4000`))