const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isRoleValid, emailExiste, existeUsuarioById } = require('../helpers/db-validators');
const router = Router();


router.get('/', usuariosGet );
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( ( id ) => existeUsuarioById( id ) ),
    check('rol').custom( ( rol ) => isRoleValid( rol ) ),
    validarCampos
], usuariosPut );
router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(), // isEmpty() -> significa que estas preguntado si esta vacio
    check('password', 'El password es obligatorio').notEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min:6 }),
    check('password', 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
    check('correo', 'El correo es obligatorio').notEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( ( correo ) => emailExiste( correo )),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']),
    check('rol').custom( ( rol ) => isRoleValid( rol ) ),
    validarCampos
], usuariosPost );
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( ( id ) => existeUsuarioById( id ) ),
    validarCampos
], usuariosDelete );

module.exports = router;