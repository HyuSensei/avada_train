const db = require("../firesrtore/db");
const { format } = require("date-fns");

const productRef = db.collection("products");
const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
const create = async (data) => {
  try {
    data.createdAt = date;
    data.updatedAt = date;
    const product = await productRef.add(data);
    const getProduct = await product.get();
    return { id: getProduct.id, ...getProduct.data() };
  } catch (error) {
    console.log(error);
  }
};

const update = (dataUpdate) => {
  try {
    dataUpdate.updatedAt = date;
    productRef.doc(dataUpdate.id).update(dataUpdate.data);
  } catch (error) {
    console.log(error);
  }
};

const getAll = () => {
  try {
    const products = productRef.get();
    return products;
  } catch (error) {
    console.log(error);
  }
};

const destroy = (id) => {
  try {
    return productRef.doc(id).delete();
  } catch (error) {
    console.log(error);
  }
};

const show = (id) => {
  try {
    const product = productRef.doc(id).get();
    return product;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  update,
  getAll,
  destroy,
  show,
};
