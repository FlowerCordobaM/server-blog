const { handleHttpError } = require("../../../shared/helpers/handleError");
const { userModel } = require("../models");

const createUser = async (req, res) => {
  try {
      // Verificar si ya existe un usuario con el mismo email o nombre de usuario
      const existingUser = await userModel.findOne({
          $or: [{ email: req.body.email }, { name: req.body.name }]
      });

      if (existingUser) {
          return res.status(400).json({
              message: 'Ya existe un usuario con ese email o nombre de usuario'
          });
      }

      // Crear un nuevo usuario si no existe uno con el mismo email o nombre de usuario
      const user = new userModel({
          ...req.body,
          role: 'USER_ADMIN' // Asignando el rol 'admin' por defecto
      });
      await user.save();
      res.status(201).json(user);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_USER_ADMIN");
  }
};
const updateUser = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await userModel.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    // Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await userModel.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    if (!usuarioDB.google) {
      campos.email = email;
    } else if (usuarioDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario de google no pueden cambiar su correo",
      });
    }

    const usuarioActualizado = await userModel.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_USER");
  }
};
const getItUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;

  try {
    const users = await userModel.find().limit(limit).skip(skipIndex);
    const total = await userModel.countDocuments();

    res.json({
      page,
      limit,
      total,
      users
  });


  } catch (error) {
    console.log(error)
    handleHttpError(res, "ERROR_GET_USER");
  }
};

const deleteUser = async (req, res) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await userModel.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    await userModel.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_USER");
  }
};
const getUserById = async (req, res) => {
  try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
    console.log(error)
    handleHttpError(res, "ERROR_USER_ById_ADMIN");
  }
};

module.exports = {
  deleteUser,
  getItUsers,
  updateUser,
  getUserById,
  createUser
};
