//===================
//Puerto
//===================

process.env.PORT = process.env.PORT || 3000;

//===================
//Entorno
//===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===================
//Base de datos
//===================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafeDB';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

//===================
//Vencimiento del Token
//===================
//60 segundos
//60 minutos
//24 horas
//30 días
process.env.CADUCIDAD_TOKEN = ((60 * 60) * 24) * 30;

//===================
//SEED de autentificación
//===================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

//===================
//Google Client ID
//===================
process.env.CLIENT_ID = process.env.CLIENT_ID || '669183183240-mra1qvgph2n9r4cfl56tb8b37l09f2ea.apps.googleusercontent.com'