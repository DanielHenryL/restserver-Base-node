const { request, response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async( req = request, res = response ) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
      return res.status(400).json({
                msg:'No hay archivos que subir'
            });
    }
    
    try {
        // por si quiero trabajar con las extensiones por defecto pero en una carpeta asignada.
        // const nombre = await subirArchivo( req.files, undefined, 'usuario' );
        const nombre = await subirArchivo( req.files, ['jpeg','png','jpg'] ) ;
        res.json({ nombre });
    } catch ( msg ) {
        res.status(400).json({msg})
    }
}


module.exports = {
    cargarArchivo
}