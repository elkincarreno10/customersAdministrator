import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import db from "./config/db.js";
import loginRoutes from './routes/loginRoutes.js'
import clientesRoutes from './routes/clientesRoutes.js'
import campesinosRoutes from './routes/campesinosRoutes.js'
import obrerosRoutes from './routes/obrerosRoutes.js'

process.env.TZ = 'America/Bogota';
const app = express()
dotenv.config()


// Habilitar el envio de json
app.use(express.json())

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);

        if(whiteList.includes(origin)) {
            // Puede consultar la API
            callback(null, true)
        } else {
            // NO PERMITIDO POR CORS
            const msg = 'La política CORS de este sitio no permite acceso desde el origen especificado.';
            callback(new Error(msg))
        }
    }
}
app.use(cors(corsOptions))

app.use('/api', loginRoutes)
app.use('/api/clientes', clientesRoutes)
app.use('/api/campesinos', campesinosRoutes)
app.use('/api/obreros', obrerosRoutes)


const buildPath = new URL('../frontend/dist', import.meta.url).pathname
app.use(express.static(buildPath))

app.get('/*', function(req, res){
    res.sendFile(
        new URL('../frontend/dist/index.html', import.meta.url).pathname,
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    )
})


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