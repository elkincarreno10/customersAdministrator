import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import db from "./config/db";
import path from 'path'
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
    origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
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


const buildPath = path.join(__dirname, "../frontend/dist")
app.use(express.static(buildPath))

app.get('/*', function(req, res){
    res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html"),
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