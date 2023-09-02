const dbValidarors = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerefy = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidarors,
    ...generarJWT,
    ...googleVerefy,
    ...subirArchivo,
}