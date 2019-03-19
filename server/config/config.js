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
    urlDB = 'mongodb+srv://rousemarie:ic6UIJngzFiGfemL@cluster0-lczgn.mongodb.net/cafeDB';
}
process.env.URLDB = urlDB;