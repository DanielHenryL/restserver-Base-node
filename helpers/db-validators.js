const { Usuario , Role, Categoria } = require('../models');

const isRoleValid = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol:rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}
const emailExiste = async( correo = '') => {
    const existeEmail = await Usuario.findOne( { correo: correo } );
    if( existeEmail ){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}
const existeUsuarioById = async( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`El usuario con id:${ id } no existe`);
    }
}
const existeCategoriaById = async( id ) => {
    const existeCategoria = await Categoria.findById( id );
    if( !existeCategoria ){
        throw new Error(`La categoria con id:${ id } no existe`);
    }
}

const existeCategoriaBD = async( nombre = '') =>{
    const existeCategoria = await Categoria.findOne({ nombre:nombre.toUpperCase() });
    if( existeCategoria ){
        throw new Error(`La categoria con nombre '${ nombre.toUpperCase() }' ya existe`);
    }
}

module.exports = {
    isRoleValid,
    emailExiste,
    existeUsuarioById,
    existeCategoriaById,
    existeCategoriaBD
}