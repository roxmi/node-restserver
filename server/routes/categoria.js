const express = require('express');
let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

//GET-Tienen que aparecer todas las categorias
app.get('/categoria', verificaToken, (req, res) => {
    Categoria
        .find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email') // Esto es para llenar los datos de un esquema
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Categoria.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    categorias,
                    cuantos: conteo
                });
            })

        });
});
//GET-Mostrar una categia por ID findById
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: { message: 'El Id no es válido' }
            });
        }

        res.json({
            ok: true,
            categorias: categoriaDB
        });
    });
});
//POST- Dar de alta una categoria- req.usuario._id
app.post('/categoria', verificaToken, (req, res) => {

    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
});
//PUT Actualizar la categoría (Sólo descripción de la categoría)
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let categoriaReq = { descripcion: body.descripcion }
    Categoria.findByIdAndUpdate(id, categoriaReq, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});
//DELETE Sólo lo puede borrar un admin y que pida el token, y se tiene que eliminar findByIdAndRemove
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
})

//Todo tiene que estar en postman y usar token para todo

module.exports = app;