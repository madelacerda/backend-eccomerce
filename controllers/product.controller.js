const { ObjectId } = require("mongodb");
const product = require("../models/product.model");

const findAll = async (req, res) => {
  try {
    const productos = await product.find();
    return res.json(productos);
  } catch (e) {
    return res.json({
      msg: "error",
      details: e.message,
    });
  }
};
const findOndByName = async (req, res) => {
  try {
    const filter = {
      slug: req.params.slug,
    };

    const productos = await product.find(filter);
    return res.json({ productos });
  } catch (e) {
    return res.json({
      msg: "error",
      details: e.message,
    });
  }
};

const findOndByid = async (req, res) => {
  try {
    const filter = {
      _id: req.params._id,
    };

    const productos = await product.find(filter);
    return res.json({ productos });
  } catch (e) {
    return res.json({
      msg: "error",
      details: e.message,
    });
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  let {
    slug,
    nombre,
    descripcion,
    precio,
    img,
    categoria,
    numReviews,
    rating,
    countInStock,
  } = req.body;
  try {
    let producto;
    await product.findByIdAndUpdate(
      id,
      {
        slug,
        nombre,
        descripcion,
        precio,
        img,
        categoria,
        numReviews,
        rating,
        countInStock,
      },
      (err, prod) => {
        if (err) {
          console.log(err);
        } else {
          producto = prod;
        }
      }
    );

    return res.json({
      msg: "producto guardado",
      details: producto,
    });
  } catch (e) {
    return res.json({
      msg: "error",
      details: e.message,
    });
  }
};

const save = async (req, res) => {
  try {
    const producto = new product(req.body);
    const respuesta = producto.save();

    return res.json({
      msg: "producto guardado",
      details: respuesta,
    });
  } catch (e) {
    return res.json({
      msg: "error",
      details: e.message,
    });
  }
};
const del = async (req, res) => {
  try {
    await product.deleteOne({ name: req.params.name });
    return res.json({
      msg: "Ok!",
      details: `${req.params.name} ha sido borrado`,
    });
  } catch (e) {
    console.log(error);
    return res.json({
      msg: "error",
      details: error.message,
    });
  }
};

module.exports = {
  findAll,
  findOndByName,
  findOndByid,
  save,
  del,
  update,
};
