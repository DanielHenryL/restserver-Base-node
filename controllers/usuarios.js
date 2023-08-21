const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet= async( req = request, res = response ) => {
    // desestructura los query 
    const { limit = 5, desde = 0 } = req.query;
    // lista los usuarios con estado true
    // const usuarios = await Usuario.find({ estado:true })
        // .skip( desde ) // inicio del listado
        // .limit( limit ); // cantidad que va a listar
    // contabiliza la cantidad de usuario con estado true
    // const total = await Usuario.countDocuments({ estado:true });

    // mejorar la velocidad de respuesta, esto resolvera las promesas en simultaneo, nota: si uno falla disparará error
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( { estado:true } ),
        Usuario.find( { estado:true } )
            .skip( desde )
            .limit( limit )
    ]);
    res.json({
        total,
        usuarios
    });
}
const usuariosPut = async( req = request, res = response ) => {
    
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if( password ){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new:true} );

    res.json(usuario);
}
const usuariosPost= async( req = request, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    // Guardar en la bd
    await usuario.save();

    res.json({
        usuario
    });
}
const usuariosDelete= ( req = request, res = response ) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete

}