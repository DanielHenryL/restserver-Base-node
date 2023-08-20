const Role = require('../models/role');
const Usuario = require('../models/usuario');

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
module.exports = {
    isRoleValid,
    emailExiste
}