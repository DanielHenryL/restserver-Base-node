const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuario = async( termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid( termino );
    if ( esMongoID ) {
        const usuario = await Usuario.findById( termino );
        res.json({
            result:( usuario ) ? [ usuario ]: []  
        });
    }
}


const buscar = ( req = request, res = response ) =>{
    const { coleccion, termino } = req.params;
    
    if ( !coleccionesPermitidas.includes(coleccion) ) {
        return res.status(400).json({
            msg:`La colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch( coleccion ){
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        case 'categorias':
            break;
        case 'productos':
            break;
        default:
            res.status(500).json({
                msg:'se me olvido hacer ese filtro',
            })
    }
}

module.exports = {
    buscar
}