const yup = require("yup");

const productAdd = async (ctx, next) => {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      product: yup.string().required(),
      color: yup.string().required(),
      image: yup.string().required(),
    });
    const check = await schema.validate(postData);
    console.log("check:", check);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: [e.message],
      errorName: e.name,
    };
  }
};

const productUpdate = async (ctx, next) => {
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
    next();
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
  productAdd,
  productUpdate,
};
