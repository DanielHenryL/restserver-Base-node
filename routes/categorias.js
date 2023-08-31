const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJwt, tieneRole } = require('../middlewares');
const { categoriasGet, categoriaGet, categoriaPost, categoriaPut, categoriaDelete } = require('../controllers/categorias');
const { existeCategoriaById, existeCategoriaBD } = require('../helpers/db-validators');
const router = Router();

// Obtener todas las categorias
router.get('/', categoriasGet);

// Obtener todas las categorias por id
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( (id) => existeCategoriaById( id )),
    validarCampos
], categoriaGet);

// Crear categorias - privada - cualquier persona con un toke valido.
router.post('/',[
    validarJwt,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('nombre').custom( ( nombre ) => existeCategoriaBD( nombre )),
    validarCampos
], categoriaPost);

// actualizar una categoria - privado - cualquiera con token valido
router.put('/:id',[
    validarJwt,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( (id) => existeCategoriaById( id )),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('nombre').custom( ( nombre ) => existeCategoriaBD( nombre )),
    validarCampos
], categoriaPut);

// borrar una categoria - admin 
router.delete('/:id',[
    validarJwt,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( (id) => existeCategoriaById( id )),
    validarCampos
], categoriaDelete);

module.exports = router;