const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) =>{
    
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        // firmar nuevo token
        jwt.sign( 
                payload, 
                process.env.SECRETORPRIVATEKEY,
                {
                    expiresIn: '4h'
                },
                ( err, token ) => {
                    if ( err ) {
                        reject( 'No se pudo generar el JWT ')
                    }else{
                        resolve( token )
                    }
                } 
            );
    })
}

module.exports = {
    generarJWT
}