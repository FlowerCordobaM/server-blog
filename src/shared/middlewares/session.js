
const jwt = require('jsonwebtoken');
const {userModel} = require('../../modules/user/models');

const authMiddleware = async (req, res, next) => {
    // Leer el Token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        // console.log(req.uid)
        // Buscar el usuario por UID
        const user = await userModel.findById(uid);
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido - usuario no existe en DB'
            });
        }
        // console.log('Usuario encontrado:', user); // DEBUG: Verificar la información del usuario, incluido el rol.
        // console.log('Rol del usuario:', user.role);

        // Agregar la información del usuario al objeto req
        req.usuario = user;

        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}



module.exports = authMiddleware;
