const db = require("../firesrtore/db");
const timestamp = new Date();

/**
 * @param data
 * @returns {Promise<{success:boolean,data:{id:string}}>}
 */
const productRef = db.collection("products");
const create = async (data) => {
  try {
    const createdAt = timestamp;
    const updatedAt = timestamp;
    const query = await productRef.add({ ...data, createdAt, updatedAt });
    if (query.id) {
      return {
        id: query.id,
        ...data,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param dataUpdate
 * @returns {Promise<boolean>}
 */
const update = async (dataUpdate) => {
  try {
    dataUpdate.updatedAt = timestamp;
    const doc = await productRef.doc(dataUpdate.id).get();
    if (!doc.exists) throw new Error("Not found with that id!");
    productRef.doc(dataUpdate.id).update(dataUpdate.data);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 *@param {Object} params
 * @param {number} params.limit
 * @param {string} params.sort
 * @param {string} params.fields
 * @returns {Promise<[{id:string, image:string, product:string, color:string, name:string, description:string, createdAt: Date, updatedAt: Date}]>}
 */
const getAll = async ({ limit, sort, fields }) => {
  try {
    let query = productRef;
    if (sort === "asc") {
      query = query.orderBy("price", "asc");
    }
    if (sort === "desc") {
      query = query.orderBy("price", "desc");
    }
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    if (fields) {
      const listFields = fields.split(",");
      query = query.select(...listFields);
    }
    const result = await query.get();
    return result.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {string} id
 * @returns {Promise<boolean>}
 */
const destroy = async (id) => {
  try {
    const doc = await productRef.doc(id).get();
    if (!doc.exists) throw new Error("Not found with that id!");
    productRef.doc(id).delete();
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 *
 * @param {string} id
 * @returns {Promise<{id:string, image:string, product:string, color:string, name:string, description:string, createdAt: Date, updatedAt: Date}>}
 */
const show = async (id) => {
  try {
    const doc = await productRef.doc(id).get();
    if (!doc.exists) throw new Error("Not found with that id!");
    return doc.data();
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = {
  create,
  update,
  getAll,
  destroy,
  show,
};
