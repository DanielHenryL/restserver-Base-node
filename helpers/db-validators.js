const Role = require('../models/role');

const isRoleValid = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol:rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

module.exports = {
    isRoleValid
}