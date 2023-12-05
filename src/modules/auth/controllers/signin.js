const { generateJWT } = require("../../../shared/helpers/handleJwt");
const { userModel } = require("../../user/models");
const { handleHttpError } = require("../../../shared/helpers/handleError");
const bcrypt = require("bcryptjs");
const verify = require("../../../shared/helpers/handleGoogleVery");

const handle_signig = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar email
    const userDB = await userModel.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }

    // Generar el TOKEN - JWT
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const handle_google_signIn = async (req, res) => {
  try {
      const { token: googleToken } = req.body;
      if (!googleToken) {
          return res.status(400).send('Token no proporcionado');
      }

      // Verificar el token de Google y obtener datos del usuario
      const googleUser = await verify(googleToken);

      let user = await userModel.findOne({ email: googleUser.email });

      if (!user) {
          // Crear un nuevo usuario con los datos recibidos de Google
          user = new userModel({
              name: googleUser.name,        // Nombre del usuario proporcionado por Google
              email: googleUser.email,      // Email proporcionado por Google
              img: googleUser.picture,      // Imagen proporcionada por Google
              password: "@@@",
              google: true,
          });

          await user.save();
      } else {
          // Actualizar el usuario existente con los datos de Google
          user.google = true;
          user.name = googleUser.name;
          user.img = googleUser.picture;
          await user.save();
      }

      // Generar el JWT
      const jwtToken = await generateJWT(user._id); // Asegúrate de usar _id para el JWT

      res.json({
          ok: true,
          token: jwtToken,
          user: {
              uid: user._id,
              name: user.name,
              email: user.email,
              img: user.img,
              google: user.google,
              role: user.role,
          },
      });

  } catch (error) {
      console.error(error);
      res.status(500).send("Error al verificar el token de Google");
  }
};

module.exports = { handle_signig, handle_google_signIn };
