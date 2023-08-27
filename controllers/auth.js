const { request, response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");


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

        // generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log( error );
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
    
}

const googleSignIn = ( req = request, res = response ) =>{
    const { id_token } = req.body;

    res.json({
        msg:'Todo ok',
        id_token
    })
}

module.exports = {
    login,
    googleSignIn
}