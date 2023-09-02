require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
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
            buscar:'/api/buscar',
            uploads:'/api/uploads',
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
        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use( this.paths.auth , require('../routes/auth' ));
        this.app.use( this.paths.usuarios , require('../routes/usuarios' ));
        this.app.use( this.paths.categorias , require('../routes/categorias' ));
        this.app.use( this.paths.productos , require('../routes/productos' ));
        this.app.use( this.paths.buscar , require('../routes/buscar' ));
        this.app.use( this.paths.uploads , require('../routes/uploads' ));

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log( `aplicacion corriendo en el puerto:${ this.port }` )
        });
    }

}


module.exports = Server;