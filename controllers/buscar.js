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

        return res.json({
            result:( usuario ) ? [ usuario ]: []  
        });

    } 

    const regex = new RegExp( termino, 'i' )

    const [ usuario, total ] = await Promise.all([
        Usuario.find({ 
            $or:[ { nombre: regex }, { correo: regex }],
            $and:[ { estado:true }]
        }),
        Usuario.countDocuments({ 
            $or:[ { nombre: regex }, { correo: regex }],
            $and:[ { estado:true }]
        }),
    ])

    return res.json({
        total,
        result: usuario
    });

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