const getProduct = async (ctx) => {
  try {
    let res = await fetch(`http://localhost:5000/api/products`);
    let resProducts = await res.json();
    await ctx.render("product", {
      products: resProducts.data,
    });
  } catch (error) {
    console.log;
  }
};

const getBook = async (ctx) => {};

module.exports = {
  getProduct,
  getBook,
};
