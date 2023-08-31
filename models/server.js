require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnetion } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:'/api/auth',
            usuarios:'/api/usuarios',
            categorias:'/api/categorias',
            productos:'/api/productos',
        }
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
        this.app.use( this.paths.auth , require('../routes/auth' ));
        this.app.use( this.paths.usuarios , require('../routes/usuarios' ));
        this.app.use( this.paths.categorias , require('../routes/categorias' ));
        this.app.use( this.paths.productos , require('../routes/productos' ));

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log( `aplicacion corriendo en el puerto:${ this.port }` )
        });
    }

}


module.exports = Server;