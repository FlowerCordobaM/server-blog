const { generateJWT } = require("../../../shared/helpers/handleJwt");
const { userModel } = require("../../user/models");
const bcrypt = require('bcryptjs');

const handle_signup = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await userModel.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }

    const usuario = new userModel(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    await usuario.save();

    // Generar el TOKEN - JWT
    const token = await generateJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

module.exports = { handle_signup };
