const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('correo', ' El correo es obligatorio').isEmail(),
    check('password', ' La contraseña es obligatoria').notEmpty(),
    validarCampos
], login );
router.post('/google',[
    check('id_token', 'EL id_token de google es necesario').notEmpty(),
    validarCampos
], googleSignIn );

module.exports = router;