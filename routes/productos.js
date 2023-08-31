const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJwt, tieneRole } = require('../middlewares');
const { crearProducto, listarProductos, listarProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeProductoBD, existeProductoByID, existeCategoriaById } = require('../helpers/db-validators');

const router = Router();


router.get('/',listarProductos);
router.get('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( (id) => existeProductoByID(id)),
    validarCampos
],listarProducto);
router.post('/',[
    validarJwt,
    check('nombre','El nombre es  obligatorio').notEmpty(),
    check('nombre').custom( ( nombre ) => existeProductoBD( nombre )),
    check('categoria','No es un ID de MONGO').isMongoId(),
    check('categoria').custom((categoria => existeCategoriaById(categoria))),
    validarCampos
], crearProducto);
router.put('/:id',[
    validarJwt,
    check('id','No es un ID valido').isMongoId(),
    check('categoria','No es un ID de MONGO').isMongoId(),
    check('id').custom( (id) => existeProductoByID(id)),
    validarCampos
],actualizarProducto);
router.delete('/:id',[
    validarJwt,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( (id) => existeProductoByID(id)),
    validarCampos
],eliminarProducto);

module.exports = router