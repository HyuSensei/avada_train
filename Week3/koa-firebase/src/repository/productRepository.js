const db = require("../firesrtore/db");

/**
 * @param data
 * @returns {Promise<{string}>}
 */
const productRef = db.collection("products");
const create = async (data) => {
  const timestamp = new Date();
  const createdAt = timestamp;
  const updatedAt = timestamp;
  const query = await productRef.add({ ...data, createdAt, updatedAt });
  if (query.id) {
    return query.id;
  }
};

/**
 * @param dataUpdate
 * @returns {Promise}
 */
const update = async (dataUpdate) => {
  return await productRef.doc(dataUpdate.id).update({
    ...dataUpdate,
    updatedAt: timestamp,
  });
};

/**
 *@param {Object} params
 * @param {number} params.limit
 * @param {string} params.sort
 * @param {string} params.fields
 * @returns {Promise<[{id:string, image:string, product:string, color:string, name:string, description:string, createdAt: Date, updatedAt: Date}]>}
 */
const getList = async ({ limit = 10, sort = "asc", fields = null }) => {
  try {
    let query = productRef;
    if (sort) {
      query = query.orderBy("price", `${sort}`);
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
    return [];
  }
};

/**
 *
 * @param {string} id
 * @returns {Promise}
 */
const destroy = async (id) => {
  return await productRef.doc(id).delete();
};

/**
 *
 * @param {string} id
 * @returns {Promise<{id:string, image:string, product:string, color:string, name:string, description:string, createdAt: Date, updatedAt: Date}>}
 */
const show = async (id) => {
  const doc = await productRef.doc(id).get();
  return doc.data();
};

module.exports = {
  create,
  update,
  getList,
  destroy,
  show,
};
