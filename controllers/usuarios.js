const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet= async( req = request, res = response ) => {
    // desestructura los query 
    const { limit = 5, desde = 0 } = req.query;

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
const usuariosDelete = async( req = request, res = response ) => {

    const { id } = req.params;
    const uid = req.uid; 
    
    // borrar usuario de la base de datos
    // const usuario = await Usuario.findByIdAndDelete(id);

    // cambiar estado sin eleminar el usuario
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new:true })

    res.json({usuario, uid});
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete

}