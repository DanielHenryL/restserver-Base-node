const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async( req = request, res = response ) =>{
    try {
        // por si quiero trabajar con las extensiones por defecto pero en una carpeta asignada.
        // const nombre = await subirArchivo( req.files, undefined, 'usuario' );
        const nombre = await subirArchivo( req.files, ['jpeg','png','jpg'] ) ;
        res.json({ nombre });
    } catch ( msg ) {
        res.status(400).json({msg})
    }
}

const actualizarArchivo = async( req = request, res = response ) =>{
    const { id, coleccion} = req.params;
    // el singular de la palabra usuarios o productos => usuario o producto
    const coleccionSingular = coleccion.slice(0,coleccion.length-1) // coleccion.slice(0,-1)
    let modelo;
    
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            break;
        default:
            return res.status(500).json({
                msg:'Se me olvido hacer esta validación'
            });
    }

    if ( !modelo ) {
        return res.status(400).json({
            msg:`No existe el ${ coleccionSingular } con id ${ id }`
        });
    } 

    modelo.img = await subirArchivo( req.files, ['png','jpg','jpeg'], coleccion );

    await modelo.save();

    res.json(modelo)
}

module.exports = {
    cargarArchivo,
    actualizarArchivo
}