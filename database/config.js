const mongoose = require('mongoose');

const dbConnetion = async() => {
    try {
        await mongoose.connect( process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log( 'Base de datos online' );

    } catch (error) {
        console.log( error );
        throw new Error('Error al iniciar la bd');
    }
}



module.exports = {
    dbConnetion
}