const { Usuario , Role, Categoria, Producto } = require('../models');

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

//? Categorias
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


//* Productos
const existeProductoBD = async( nombre = '') =>{
    const existeProducto = await Producto.findOne({ nombre:nombre.toUpperCase() });
    if( existeProducto ){
        throw new Error(`El producto con nombre '${ nombre.toUpperCase() }' ya existe`);
    }
}
const existeProductoByID = async( id ) => {
    const existeProducto = await Producto.findById( id );
    if( !existeProducto ){
        throw new Error(`El producto con id:${ id } no existe`);
    }
}
//* Cargar archivos
const coleccionPermitidas = ( coleccion = '', colecciones = [] ) =>{
    if ( !colecciones.includes( coleccion ) ) {
        throw new Error(`La coleccion ${ coleccion } no esta permitida,${ colecciones }`)
    }
    return true;
}


module.exports = {
    isRoleValid,
    emailExiste,
    existeUsuarioById,
    existeCategoriaById,
    existeCategoriaBD,
    existeProductoBD,
    existeProductoByID,
    coleccionPermitidas,
}