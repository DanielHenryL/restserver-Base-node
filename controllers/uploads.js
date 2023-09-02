const { request, response } = require("express")

const cargarArchivo = ( req = request, res = response ) =>{
    res.json({
        msg:'cargar archivo'
    })
}

module.exports = {
    cargarArchivo
}