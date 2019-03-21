const jwt = require('jsonwebtoken');
require('../config/config')

//================
//Verificar token
//=================

let verificaToken = (req, res, next) => {
    let token = req.get('token');
    // console.log(token);
    // console.log(process.env.SEED);
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

};

//================
//Verificar ADMIN_ROLE
//=================

let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role !== 'ADMIN_ROLE') {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
    next();
};



module.exports = {
    verificaToken,
    verificaAdmin_Role
}