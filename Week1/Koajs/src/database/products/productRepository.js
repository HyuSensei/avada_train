const fs = require("fs");
const { data: products } = require("./products.json");
const helper = require("../../helper/index");
const ultils = require("../../../ultils/generate");
const path = require("path");

/**
 * @param {number} limit
 * @param {string} sort
 * @param {string} fields
 * @returns
 */
const updatedAt = ultils.createDate();
const getAll = ({ limit, sort, fields }) => {
  let result = [...products];
  if (sort === "asc") {
    result = result.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }
  if (sort === "desc") {
    result = result.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  if (limit) {
    result = result.slice(0, limit);
  }
  if (fields) {
    result = result.map((product) => {
      return fields ? helper.pickFields(product, fields) : product;
    });
  }
  return result;
};

const getOne = (id) => {
  return products.find((product) => product.id === parseInt(id));
};

const add = (data) => {
  const id = ultils.createId();
  const createdAt = new Date();
  const addProduct = {
    ...data,
    id,
    createdAt,
    updatedAt,
  };
  const newProduct = [addProduct, ...products];
  const filePath = path.join(__dirname, "products.json");
  return fs.writeFileSync(
    filePath,
    JSON.stringify({
      data: newProduct,
    })
  );
};

const update = (data) => {
  const indexProduct = products.findIndex(
    (product) => product.id === parseInt(data.id)
  );
  if (indexProduct !== -1) {
    products[indexProduct] = {
      ...products[indexProduct],
      ...data.dataUpdate,
      ...updatedAt,
    };
    const filePath = path.join(__dirname, "products.json");
    return fs.writeFileSync(
      filePath,
      JSON.stringify({
        data: products,
      })
    );
  }
};

const destroyProduct = (id) => {
  const newProduct = products.filter((product) => product.id !== parseInt(id));
  const filePath = path.join(__dirname, "products.json");
  return fs.writeFileSync(
    filePath,
    JSON.stringify({
      data: newProduct,
    })
  );
};

module.exports = {
  getOne,
  getAll,
  add,
  update,
  destroyProduct,
};
