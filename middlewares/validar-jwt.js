const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const { Usuario } = require("../models");
const validarJwt = async( req = request, res = response, next ) =>{
    const token = req.header('x-token');
    // validar que hay un token.
    if ( !token) {
        return res.status(401).json({
            msg:'no hay un token de acceso'
        })
    }
    // verificar si lo que me mado es un token valido.
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // filtrar usuario authenticado y pasarlo a la request
        const usuario = await Usuario.findById( uid );
        
        // validar que el usuario exista en la bd
        if ( !usuario) {
            return res.status(401).json({
                msg:'token no valido - usuario no existe en la BD'
            })
        }

        // verificar si el uid tiene estado true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg:'token no valido - usuario con estado:false'
            })
        }
        req.usuario = usuario;
        // pasar al siguinete middleware
        next();

    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg:'Token no valido'
        })
    }
}

module.exports = {
    validarJwt
}