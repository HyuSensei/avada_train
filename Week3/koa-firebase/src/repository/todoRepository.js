const db = require("../firesrtore/db");
const todoRef = db.collection("todos");

/**
 *
 * @param {*} data
 * @returns {Promise<{id:string, title:string, isCompleted: boolean, createdAt: Date, updatedAt: Date}>}
 */
const create = async (data) => {
  const timestamp = new Date();
  const createdAt = timestamp;
  const updatedAt = timestamp;
  const query = await todoRef.add({ ...data, createdAt, updatedAt });
  if (query.id) {
    return {
      id: query.id,
      ...data,
    };
  }
};

/**
 * @param {Object} params
 * @param {string} params.id
 * @param {boolean} params.isCompleted
 * @returns {Promise}
 */
const update = async ({ id, isCompleted }) => {
  const timestamp = new Date();
  const updatedAt = timestamp;
  return await todoRef.doc(id).update({ isCompleted, updatedAt });
};

/**
 *
 * @returns {Promise<[{id:string, title:string, isCompleted:boolean, createdAt:Date, updatedAt:Date}]>}
 */
const getList = async () => {
  try {
    const query = await todoRef.orderBy("createdAt", "desc").get();
    return query.docs.map((doc) => ({
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
  return await todoRef.doc(id).delete();
};

/**
 * @param {*} data
 * @returns {Promise}
 */
const updateSeleted = async (data) => {
  const timestamp = new Date();
  const selected = data.selected;
  return selected.forEach(async (id) => {
    const updatedAt = timestamp;
    await todoRef
      .doc(id)
      .update({ isCompleted: data.isCompleted, updatedAt: updatedAt });
  });
};

/**
 * @param {Array} selected
 * @returns {Promise}
 */
const deleteSelected = async (selected) => {
  console.log("selected:", selected);
  selected.forEach((id) => {
    todoRef.doc(id).delete();
  });
};

module.exports = {
  create,
  update,
  getList,
  destroy,
  updateSeleted,
  deleteSelected,
};
