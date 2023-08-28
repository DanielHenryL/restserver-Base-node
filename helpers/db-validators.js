const { Usuario , Role } = require('../models');

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
module.exports = {
    isRoleValid,
    emailExiste,
    existeUsuarioById
}