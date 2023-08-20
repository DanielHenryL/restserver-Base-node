const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) =>{
    const erros = validationResult( req );
    if( !erros.isEmpty() ){
        return res.status(400).json( erros )
    }
    next(); // sino entra al if entonces pasa al siguiente error si lo hubiese, sino se ejecutara el controlador.
}


module.exports = {
    validarCampos
}