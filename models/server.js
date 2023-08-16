require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnetion } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // Conexion bd
        this.conectarDB();
        // middlewares
        this.middlewares();
        // rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnetion();
    }
    middlewares() {
        // Cors
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
        // directorio público
        this.app.use( express.static('public') );
        
    }
    routes() {
        this.app.use( this.usuariosPath , require('../routes/usuarios' ))
    }

    listen() {
        this.app.listen( this.port , () => {
            console.log( `aplicacion corriendo en el puerto:${ this.port }` )
        });
    }

}


module.exports = Server;