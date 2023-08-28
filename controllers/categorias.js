const { request, response } = require('express');


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
const categoriaPost = ( req = request, res = response ) =>{
    return res.json({
        msg:'Post'
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