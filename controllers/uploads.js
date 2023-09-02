const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { request, response } = require("express");

const cargarArchivo = ( req = request, res = response ) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
      return res.status(400).json({
                msg:'No hay archivos que subir'
            });
    }
  
    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1];

    // validar la extension
    const extensionsValidas = ['pdf','doc','docx'];
    if ( !extensionsValidas.includes(extension)) {
        return res.status(400).json({
            msg:`Los archivos con extensiones permitidas son ${ extensionsValidas }`
        })
    }

    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', nombreTemp);
    
    archivo.mv( uploadPath, (err) => {
      if ( err ) {
        console.log( err )
        return res.status(500).json({ err });
      }
  
      res.json({ msg: 'File uploaded to ' + uploadPath });
    });

}
module.exports = {
    cargarArchivo
}