const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();


app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    //nombre email role estado google img /-password
    Usuario.find({ 'estado': true }, 'nombre email role estado')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ 'estado': true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            })

        })
});

app.post('/usuario', function(req, res) {
    let body = req.body;
    //console.log(body);
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null;
        return res.json({
            ok: true,
            usuario: usuarioDB
        })


    });

    // if (body.Nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es requerido'
    //     });
    // } else {
    //     res.json({ body })
    // }
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    //let body = _.pick(req.body, 'nombre', 'email', 'img', 'role', 'estado');

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    Usuario.findByIdAndUpdate(id, { 'estado': false }, { new: true }, (err, usuarioUpdate) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuario: usuarioUpdate
            });
        })
        //Se elimina fisicamente en BD
        // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        //     if (err) {
        //         return res.status(400).json({
        //             ok: false,
        //             err
        //         });
        //     }
        //     if (!usuarioBorrado) {
        //         return res.status(400).json({
        //             ok: false,
        //             err: {
        //                 message: 'Usuario no encontrado'
        //             }
        //         });
        //     }
        //     res.json({
        //         ok: true,
        //         usuario: usuarioBorrado
        //     });
        // });
});

module.exports = app;