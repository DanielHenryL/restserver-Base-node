const { request, response, json } = require("express");
const bcryptjs = require('bcryptjs')
const { Usuario } = require('../models');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignIn = async( req = request, res = response ) =>{
    const { id_token } = req.body;
    try {

        const { nombre ,img ,correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        // crear usuario de google
        if ( !usuario ) {
            const data = {
                nombre,
                correo,
                img,
                rol:'USER_ROLE',
                password:':p',
                google:true
            }

            usuario = new Usuario( data );
            usuario.save();
        }

        // si el usuario en bd esta estado:false
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }

        // generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg:'El token no se pudo verificar',
        })
    }
}

module.exports = {
    login,
    googleSignIn
}