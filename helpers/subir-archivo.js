const { v4: uuidv4 } = require('uuid');
const path = require('path');


const subirArchivo = ( files, extensionsValidas = ['pdf','doc','docx'], carpeta ='' ) =>{

    return new Promise( (resolve, reject) => {
        
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];
    
        // validar la extension
        if ( !extensionsValidas.includes(extension)) {
            return reject(`Los archivos con extensiones permitidas son ${ extensionsValidas }`)
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );
        
        archivo.mv( uploadPath, (err) => {
            if ( err ) {
                return reject(err);
            }
      
            return resolve( nombreTemp );
        });
    });
}

module.exports = {
    subirArchivo
}