const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet= async( req = request, res = response ) => {
    const { limit = 10, desde = 0 } = req.query;
    const usuarios = await Usuario.find()
        .skip( desde )
        .limit( limit );

    res.json({
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