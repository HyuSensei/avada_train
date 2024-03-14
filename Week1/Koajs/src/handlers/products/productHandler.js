const {
  getAll: getAllProducts,
  getOne: getOneProduct,
  add: addProduct,
  update: updateProduct,
  destroyProduct,
} = require("../../database/products/productRepository");

const getProducts = async (ctx) => {
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
    const products = getAllProducts(dataQuery);
    ctx.body = {
      success: true,
      data: products,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
};

const getProductDetail = async (ctx) => {
  try {
    const { id } = ctx.params;
    const getCurrentProduct = getOneProduct(id);
    if (getCurrentProduct) {
      return (ctx.body = {
        data: getCurrentProduct,
      });
    }
    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

const save = async (ctx) => {
  try {
    const postData = ctx.request.body;
    console.log(postData);
    addProduct(postData);
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    console.log(e);
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

const update = async (ctx) => {
  try {
    const dataUpdate = ctx.request.body;
    const productId = ctx.params.id;
    const data = {
      id: productId,
      dataUpdate: dataUpdate,
    };
    updateProduct(data);
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

const destroy = async (ctx) => {
  try {
    const productId = ctx.params.id;
    destroyProduct(productId);
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductDetail,
  save,
  update,
  destroy,
};
