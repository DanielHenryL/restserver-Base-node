const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const validarJwt = ( req = request, res = response, next ) =>{
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
        // mandar por las req el uid 
        req.uid = uid;

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