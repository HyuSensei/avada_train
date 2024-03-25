const yup = require("yup");

const createProduct = async (ctx, next) => {
  try {
    const postData = ctx.req.body;
    let schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      product: yup.string().required(),
      color: yup.string().required(),
      image: yup.string().required(),
    });
    await schema.validate(postData);
    await next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: [e.message],
      errorName: e.name,
    };
  }
};

const updateProduct = async (ctx, next) => {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      name: yup.string(),
      price: yup.number(),
      description: yup.string(),
      product: yup.string(),
      color: yup.string(),
      image: yup.string(),
    });
    await schema.validate(postData);
    await next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
};

module.exports = {
  createProduct,
  updateProduct,
};
