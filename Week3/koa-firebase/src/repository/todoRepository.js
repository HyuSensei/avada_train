const db = require("../firesrtore/db");
const todoRef = db.collection("todos");
const timestamp = new Date();

/**
 *
 * @param {*} data
 * @returns {Promise<{id:string, title:string, isCompleted: boolean, createdAt: Date, updatedAt: Date}>}
 */
const create = async (data) => {
  try {
    data.createdAt = data.updatedAt = timestamp;
    const query = await todoRef.add(data);
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
 * @param {Object} params
 * @param {string} params.id
 * @param {boolean} params.isCompleted
 * @returns {Promise<boolean>}
 */
const update = async ({ id, isCompleted }) => {
  try {
    const doc = await todoRef.doc(id).get();
    const updatedAt = timestamp;
    if (!doc.exists) throw new Error("Not found with that id!");
    todoRef.doc(id).update({ isCompleted, updatedAt });
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 *
 * @returns {Promise<[{id:string, title:string, isCompleted:boolean, createdAt:Date, updatedAt:Date}]>}
 */
const getAll = async () => {
  try {
    const query = await todoRef.orderBy("createdAt", "desc").get();
    return query.docs.map((doc) => ({
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
    const doc = await todoRef.doc(id).get();
    if (!doc.exists) throw new Error("Not found with that id!");
    todoRef.doc(id).delete();
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * @param {*} data
 * @returns {Promise<boolean>}
 */
const updateSeleted = async (data) => {
  try {
    const selected = data.selected;
    selected.forEach((id) => {
      const updatedAt = timestamp;
      todoRef
        .doc(id)
        .update({ isCompleted: data.isCompleted, updatedAt: updatedAt });
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {Array} selected
 * @returns {Promise<boolean>}
 */
const deleteSelected = async (selected) => {
  try {
    selected.forEach((id) => {
      todoRef.doc(id).delete();
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  update,
  getAll,
  destroy,
  updateSeleted,
  deleteSelected,
};
