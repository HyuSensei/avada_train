const productRepository = require("../repository/productRepository");

const createProduct = async (ctx) => {
  try {
    const product = await productRepository.create(ctx.request.body);
    console.log(product);
    if (product) {
      return (ctx.body = {
        success: true,
        message: "Create product successfully",
        product: product,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = async (ctx) => {
  try {
    const res = await productRepository.getAll();
    const products = res.docs.map((doc) => {
      const id = doc.id;
      return {
        id,
        ...doc.data(),
      };
    });
    return (ctx.body = {
      success: true,
      message: "Get product all",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (ctx) => {
  try {
    const dataUpdate = {
      id: ctx.params.id,
      data: ctx.request.body,
    };
    productRepository.update(dataUpdate);
    return (ctx.body = {
      success: true,
      message: "Update product successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (ctx) => {
  try {
    const id = ctx.params.id;
    productRepository.destroy(id);
    return (ctx.body = {
      success: true,
      message: "Delete product successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (ctx) => {
  try {
    const product = await productRepository.show(ctx.params.id);
    if (product) {
      return (ctx.body = {
        success: true,
        message: "Get product detail",
        product: product.data(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
};
