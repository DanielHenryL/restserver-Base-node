const { request, response } = require('express');
const { Categoria } = require('../models');

//* Obtener todas las categorias - paginar - total - informacion de quien creo la categoria
const categoriasGet = async( req = request, res = response ) =>{
    const { limit = 10, desde } =req.query;

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments({ estado:true }),
        Categoria.find({ estado:true })
            .limit( limit )
            .skip( desde )
            .populate('usuario','nombre'),     
            // .populate({ path:'usuario', select:['nombre','correo']}), //*  algunos campos especifico primera forma    
            // .populate('usuario','nombre correo'),  //* algunos campos especificos segunda forma
    ])
    return res.json({
        total,
        categorias,
    })
}
const categoriaGet = async( req = request, res = response ) =>{
    const { id } = req.params;
    const categoria = await Categoria.findById( id )
        .populate('usuario');
    return res.json(
        categoria
    )
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
const categoriaPut = async( req = request, res = response ) =>{
    const { id } = req.params;
    
    //* sacamos al usuario, x si me estan mandando un usuario no coicidente con el cambio
    const { usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, resto, { new: true } )
    return res.json(
        categoria
    )
}
const categoriaDelete = async( req = request, res = response ) =>{
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate( id , {estado:false}, {new:true} );

    return res.json({
        categoria
    })
}

module.exports = {
    categoriasGet,
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}