const { userModel } = require("../../user/models");
const { blogModel } = require("../../blog/models");
const { CategoryModel } = require("../../category/models");
const { tagsModel } = require("../../tags/models");

const searchAll = async (req, res) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    try {
        const [users, blogs, categories, tags] = await Promise.all([
            userModel.find({ name: regex }).lean(),
            blogModel.find({ title: regex }).lean(),
            CategoryModel.find({ name: regex }).lean(),
            tagsModel.find({ name: regex }).lean()
        ]);

        res.json({
            ok: true,
            usuarios: users,
            blogs,
            categorias: categories,
            etiquetas: tags
        });
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_GLOBAL_SEARCH");
    }
};

const searchInCollection = async (req, res) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, 'i');
  let data = [];

  try {
      switch (tabla) {
          case 'users':
              data = await userModel.find({ name: regex }).lean();
              break;
          case 'blogs':
              data = await blogModel.find({ title: regex }).lean();
              break;
          case 'categories':
              data = await CategoryModel.find({ name: regex }).lean();
              break;
          case 'tags':
              data = await tagsModel.find({ name: regex }).lean();
              break;
          default:
              return res.status(400).json({
                  ok: false,
                  msg: 'La tabla debe ser una de las siguientes: usuarios, blogs, categorias, etiquetas'
              });
      }

      res.json({
          ok: true,
          resultados: data
      });
  } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_SEARCH_IN_COLLECTION");
  }
}
module.exports = { searchAll,searchInCollection };
