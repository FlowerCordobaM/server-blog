const { generateJWT } = require("../../../shared/helpers/handleJwt");
const usersModel = require("../../user/models/usersModel");

const concurrent = async (req, res = response) => {
  const uid = req.uid;
  // Generar el TOKEN - JWT
  const token = await generateJWT(uid);
  // Obtener el usuario por UID
  const user = await usersModel.findById(uid);

  res.json({
    ok: true,
    token,
    user,
  });
};
module.exports = concurrent;
