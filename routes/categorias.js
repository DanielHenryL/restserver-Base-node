const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJwt } = require('../middlewares');
const { categoriasGet, categoriaGet, categoriaPost, categoriaPut, categoriaDelete } = require('../controllers/categorias');
const router = Router();

// Obtener todas las categorias
router.get('/', categoriasGet);

// Obtener todas las categorias
router.get('/:id', categoriaGet);

// Crear categorias - privada - cualquier persona con un toke valido.
router.post('/',[
    validarJwt,
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
], categoriaPost);

// actualizar una categoria - privado - cualquiera con token valido
router.put('/:id', categoriaPut);

// borrar una categoria - admin 
router.delete('/:id', categoriaDelete);

module.exports = router;