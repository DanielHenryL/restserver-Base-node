const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');
const router = Router();


router.get('/', usuariosGet );
router.put('/:id', usuariosPut );
router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(), // isEmpty() -> significa que estas preguntado si esta vacio
    check('password', 'El password es obligatorio').notEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min:6 }),
    check('password', 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
    check('correo', 'El correo es obligatorio').notEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol').custom( async( rol = '' ) => {
        const existeRol = await Role.findOne({ rol:rol });
        if( !existeRol ){
            throw new Error(`El rol ${ rol } no esta registrado en la BD`);
        }
    }),
    validarCampos
], usuariosPost );
router.delete('/', usuariosDelete );

module.exports = router;