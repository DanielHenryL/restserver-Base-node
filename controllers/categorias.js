const { request, response } = require('express');
const { Categoria } = require('../models');


const categoriasGet = ( req = request, res = response ) =>{
    return res.json({
        msg:'Get'
    })
}
const categoriaGet = ( req = request, res = response ) =>{
    return res.json({
        msg:'Get - id'
    })
}
const categoriaPost = async( req = request, res = response ) =>{
    // guardar el nombre de la categoria en mayuscula
    const nombre = req.body.nombre.toUpperCase();
    // verificar si no hay duplicado
    const categoriaDB = await Categoria.findOne({ nombre });

    // validar si la categoria existe en la BD
    if ( categoriaDB ) {
        return res.status(400).json({
            msg:`La categoria ${ categoriaDB.nombre } ya existe en la base de datos`
        })
    }
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);
    // guardar en bd 
    await categoria.save();

    res.status(201).json({
        categoria
    })
}
const categoriaPut = ( req = request, res = response ) =>{
    return res.json({
        msg:'Put'
    })
}
const categoriaDelete = ( req = request, res = response ) =>{
    return res.json({
        msg:'Delete'
    })
}

module.exports = {
    categoriasGet,
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}