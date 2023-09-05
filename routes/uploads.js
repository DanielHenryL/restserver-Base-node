const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, actualizarArchivo, mostrarArchivo } = require('../controllers/uploads');
const { coleccionPermitidas, existeUsuarioOrproductoById } = require('../helpers');
const { validarArchivoSubir, validarCampos } = require('../middlewares');


const router = Router();

router.post('/',[
    validarArchivoSubir,
    validarCampos
], cargarArchivo );
router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','No es un ID de mongo validó').isMongoId(),
    check('coleccion').custom( ( coleccion ) => coleccionPermitidas( coleccion, ['usuarios','productos'] )),
    // check('coleccion','No esta en la coleccion').isIn( ['usuario','producto'] ), //*otra forma de validarlo
    validarCampos
], actualizarArchivo);
router.get('/:coleccion/:id',[
    check('id','No es un ID de mongo validó').isMongoId(),
    check('coleccion').custom( ( coleccion ) => coleccionPermitidas( coleccion, ['usuarios','productos'] )),
    validarCampos
],mostrarArchivo);

module.exports = router;