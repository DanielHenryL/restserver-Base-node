const { response, request } = require("express")


const esAdminRole = ( req =request, res = response, next ) =>{
    if ( !req.usuario ) {
        return res.status(500).json({
            msg:'Se require verificar el rol sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg:`${nombre} no es administrador`
        });
    };

    next();
}

// ..roles recibe todos los argumentos que le pasen a la funcion y lo almacena en una lista
const tieneRole = ( ...roles ) =>{
    return ( req =request, res = response, next ) => {
        if ( !req.usuario ) {
            return res.status(500).json({
                msg:'Se require verificar el rol sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol )) {
            return res.status(401).json({
                msg:`${ req.usuario.nombre } no tiene privilegios necesarios`
            })
        }

        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}