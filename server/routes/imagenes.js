const express = require('express');
const fs = require('fs');
const path = require('path');
let { verificaTokenImg, } = require('../middlewares/autenticacion');
const app = express();

app.get('/imagen/:tipo/:img',verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        res.sendFile( path.resolve(__dirname, '../assets/nodisponible.png'));
    }

});


module.exports = app;