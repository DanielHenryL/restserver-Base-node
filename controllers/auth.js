const { request, response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const login = async( req = request, res = response ) =>{
    
    const { correo, password } = req.body;

    try {
        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg:'Usuarios / password no son correctos - correo'
            })
        }

        // SI el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg:'Usuarios / password no son correctos - estado: false'
            })
        }

        // verificar si la contraseña es valida
        const validPaaword = bcryptjs.compareSync( password, usuario.password )
        if( !validPaaword ) {
            return res.status(400).json({
                msg:'Usuarios / password no son correctos - password'
            })
        }
        res.json({
            msg:'login ok',
            usuario
        })

    } catch (error) {
        console.log( error );
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
    
}

module.exports = {
    login
}