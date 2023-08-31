const { response, request } = require('express');
const { Producto, Categoria } = require('../models');



const listarProductos = async( req = request, res = response ) =>{
    const { limit = 10, desde = 0 } = req.query;

    const [ productos, total ] = await Promise.all([
        Producto.find({ estado:true })
            .limit( limit )
            .skip( desde )
            .populate( { path:'usuario', select:'nombre' } )
            .populate( { path:'categoria', select:'nombre' } ),
        Producto.countDocuments({ estado:true })
    ]) 
    res.status(200).json({
        total,
        productos
    })
}

const listarProducto = async( req = request, res = response ) =>{
    const { id } = req.params;
    
    const producto = await Producto.findById( id )
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.status(200).json(
        producto
    )
}
const crearProducto = async( req = request, res = response ) =>{

    const { nombre, ...resto } = req.body;

    const data = {
        ...resto,
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();
    
    res.status(201).json(
       producto
    )
}
const actualizarProducto = async( req = request, res = response ) =>{

    const { id } = req.params;
    const { usuario, ...resto } = req.body;

    if( resto.nombre ){
        resto.nombre = resto.nombre.toUpperCase();
    }

    resto.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, resto, { new:true });

    res.status(200).json(
        producto
    )
}
const eliminarProducto = async( req = request, res = response ) =>{

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id , { estado:false }, { new:true } );

    res.status(200).json(
        producto
    )
}


module.exports = {
    listarProductos,
    listarProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}