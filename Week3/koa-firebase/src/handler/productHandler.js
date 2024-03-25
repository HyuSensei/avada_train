const productRepository = require("../repository/productRepository");

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean , message:string, product:{id:string}} | {success: boolean, error: *}>}
 */
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
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message:string, product: [{id:string, image:string, product:string, color:string, name:string, description:string, createdAt: Date, updatedAt: Date}] | {success:boolean,product:[],error:*}}>}
 */
const getAllProduct = async (ctx) => {
  try {
    let limit = ctx.query["limit"];
    let sort = ctx.query["sort"];
    let fields = ctx.query["fields"];
    if (!limit) {
      limit = 10;
    }
    if (!sort) {
      sort = "desc";
    }
    if (!fields) {
      fields = "";
    }
    const dataQuery = {
      limit,
      sort,
      fields,
    };
    const products = await productRepository.getAll(dataQuery);
    if (products) {
      return (ctx.body = {
        success: true,
        message: "Get product all",
        products: products,
      });
    }
  } catch (error) {
    ctx.body = {
      success: false,
      products: [],
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message:string} | {success:boolean, error:*}>}
 */
const updateProduct = async (ctx) => {
  try {
    const dataUpdate = {
      id: ctx.params.id,
      data: ctx.request.body,
    };
    const res = await productRepository.update(dataUpdate);
    console.log(res);
    if (res) {
      return (ctx.body = {
        success: true,
        message: "Update product successfully",
      });
    }
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message:string} | {success:boolean, error:*}>}
 */
const deleteProduct = async (ctx) => {
  try {
    const id = ctx.params.id;
    const res = await productRepository.destroy(id);
    console.log(res);
    if (res) {
      return (ctx.body = {
        success: true,
        message: "Delete product successfully",
      });
    }
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message:string, product:{id:string, image:string, product:string, color:string, name:string, description:string, createdAt: Date, updatedAt: Date}|{success:boolean,error:*}}>}
 */
const getProductDetail = async (ctx) => {
  try {
    const product = await productRepository.show(ctx.params.id);
    console.log(product);
    if (product) {
      return (ctx.body = {
        success: true,
        message: "Get product detail",
        product: product,
      });
    }
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
};
