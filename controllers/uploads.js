const path = require('path');
const fs = require('fs');
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

    if ( modelo.img ) {
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if( fs.existsSync(pathImagen) ){
            fs.unlinkSync(pathImagen)
        }
    }
    try {
        // por si quiero trabajar con las extensiones por defecto pero en una carpeta asignada.
        // const nombre = await subirArchivo( req.files, undefined, 'usuario' );
        modelo.img = await subirArchivo( req.files, undefined, coleccion );
        await modelo.save();
        res.json(modelo)
    } catch ( msg ) {
        res.status(400).json({msg})
    }

}

const mostrarArchivo = async( req = request, res = response ) =>{
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
    //mostrar imagen o archivo en nuestro servidor
    if ( modelo.img ) {
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if( fs.existsSync( pathImagen ) ){
            return res.sendFile( pathImagen );
        }
        return res.json({
            msg:'La imagen no se encuentra, capas fue borrada de la bd'
        });
    }
    // mostrar imagen o archivo por defecto
    const pathImagen = path.join( __dirname, '../assets', 'no-image.jpg' );
    if( fs.existsSync( pathImagen ) ){
        return res.sendFile( pathImagen );
    }
    

}

module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarArchivo
}