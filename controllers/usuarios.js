const { response, request } = require('express');
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const usuariosGet= ( req = request, res = response ) => {
    
    const { q, nombre = 'No name', apikey, page="1", limit} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}
const usuariosPut= ( req = request, res = response ) => {
    
    const { id } = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    });
}
const usuariosPost= async( req = request, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // verificar si el correo existe
    const existeEmail = await Usuario.findOne( { correo: correo } );
    if( existeEmail ){
        return res.status(400).json({
            msg:'Ese correo ya esta registrado'
        })
    }
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    // Guardar en la bd
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
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