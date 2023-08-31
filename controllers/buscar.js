const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuario = async( termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid( termino );
    if ( esMongoID ) {

        const usuario = await Usuario.findById( termino );

        return res.json({
            result:( usuario && usuario.estado ) ? [ usuario ]: [] 
        });

    } 

    const regex = new RegExp( termino, 'i' )

    const [ usuario, total ] = await Promise.all([
        Usuario.find({ 
            $or:[ { nombre: regex }, { correo: regex }],
            $and:[ { estado:true }]
        }),
        Usuario.countDocuments({ 
            $or:[ { nombre: regex }, { correo: regex }],
            $and:[ { estado:true }]
        }),
    ])

    return res.json({
        total,
        result: usuario
    });

}
const buscarCategoria = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {

        const categoria = await Categoria.findById( termino )
                                        .populate('usuario','nombre');

        return res.json({
            result:( categoria && categoria.estado ) ? [ categoria ]: []  
        });

    } 

    const regex = new RegExp( termino, 'i' )

    const [ categoria , total ] = await Promise.all([
        Categoria.find({ 
            $or:[ { nombre: regex }],
            $and:[ { estado:true }]
        }).populate('usuario','nombre'),
        Categoria.countDocuments({ 
            $or:[ { nombre: regex }],
            $and:[ { estado:true }]
        }),
    ])

    return res.json({
        total,
        result: categoria
    });

}
const buscarProducto = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {
        //listar por id del producto
        // const producto = await Producto.findById( termino )
        //                         .populate({ path:'usuario', select:'nombre' })
        //                         .populate({ path:'categoria', select:'nombre' });

        // listar todos los productos que tengan la misma categorias
        const productxcategoria = await Producto.find({ categoria: termino, estado:true })
                                            .populate({ path:'usuario', select:'nombre' })
                                            .populate({ path:'categoria', select:'nombre' });
        return res.json( {
            results: ( productxcategoria ) ? [ productxcategoria ] : []
        })

    } 

    const regex = new RegExp( termino, 'i' )

    const [ producto , total ] = await Promise.all([
        Producto.find({ 
            $or:[ { nombre: regex },{ descripcion: regex }],
            $and:[ { estado:true }]
        }).populate({ path:'usuario', select:'nombre' })
          .populate({ path:'categoria', select:'nombre' }),
        Producto.countDocuments({ 
            $or:[ { nombre: regex },{ descripcion: regex }],
            $and:[ { estado:true }]
        }),
    ])

    return res.json({
        total,
        result: producto
    });

}


const buscar = ( req = request, res = response ) =>{
    const { coleccion, termino } = req.params;
    
    if ( !coleccionesPermitidas.includes(coleccion) ) {
        return res.status(400).json({
            msg:`La colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch( coleccion ){
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        case 'categorias':
            buscarCategoria(termino, res);
            break;
        case 'productos':
            buscarProducto(termino, res)
            break;
        default:
            res.status(500).json({
                msg:'se me olvido hacer ese filtro',
            })
    }
}

module.exports = {
    buscar
}