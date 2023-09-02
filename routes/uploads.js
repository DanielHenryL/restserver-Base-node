const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo, actualizarArchivo } = require('../controllers/uploads');
const { coleccionPermitidas, existeUsuarioById } = require('../helpers');


const router = Router();

router.post('/', cargarArchivo );
router.put('/:coleccion/:id',[
    check('id','No es un ID de mongo validó').isMongoId(),
    check('id').custom( existeUsuarioById ),
    check('coleccion').custom( ( coleccion ) => coleccionPermitidas( coleccion, ['usuario','producto'] )),
    // check('coleccion','No esta en la coleccion').isIn( ['usuario','producto'] ), //*otra forma de validarlo
    validarCampos
], actualizarArchivo)

module.exports = router;