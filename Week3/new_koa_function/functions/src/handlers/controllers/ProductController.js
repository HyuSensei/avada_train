const db = require("../../firestore/db");

const createProduct = async (ctx) => {
  try {
    const postData = ctx.req.body;
    console.log("postData:", postData);
    return (ctx.body = {
      success: true,
      data: postData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = () => {};

const updateProduct = () => {};

const deleteProduct = () => {};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
