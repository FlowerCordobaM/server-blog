
const { handleHttpError } = require("../helpers/handleError");

const checkRol = (roles) => (req, res, next) => {
  try {
    const usuario = req.usuario;

    // console.log('Usuario en checkRol:', usuario); // DEBUG: Mostrar la información del usuario
    // console.log('Roles requeridos:', roles); // DEBUG: Mostrar los roles requeridos

    if (!usuario || !usuario.role) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }

    // Utiliza 'usuario.role' en lugar de 'user.role'
    const hasRequiredRole = roles.some(roleRequired => usuario.role.includes(roleRequired));

    // console.log('Tiene rol requerido:', hasRequiredRole); // DEBUG: Confirmar si el usuario tiene el rol requerido

    if (!hasRequiredRole) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }

    next();
  } catch (e) {
    console.log('Error en checkRol', e);
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = checkRol;


module.exports = checkRol;


