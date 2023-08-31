const { request, response } = require('express');

const buscar = ( req = request, res = response ) =>{
    const { coleccion, termino} = req.params;
    
    res.json({
        msg:'Buscar...',
        coleccion,
        termino
    })
}

module.exports = {
    buscar
}