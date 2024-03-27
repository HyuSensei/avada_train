const todoRepository = require("../repository/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message:string, todo:{title: string, isCompleted: boolean, createdAt: Date, updatedAt: Date}}| {success:boolean,error:*}>}
 */
const createTodo = async (ctx) => {
  try {
    const data = ctx.req.body;
    const todo = await todoRepository.create(data);
    return (ctx.body = {
      success: true,
      message: "Create todo success",
      todo: todo,
    });
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:string, message:string, todos:[{title:string, isCompleted: boolean, createdAt: Date, updatedAt:Date}]}|{success:boolean, todos:[],error:*}>}
 */
const getAllTodo = async (ctx) => {
  try {
    const todos = await todoRepository.getList();
    return (ctx.body = {
      success: true,
      message: "Get all todos list",
      todos: todos,
    });
  } catch (error) {
    ctx.body = {
      success: false,
      todos: [],
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message:string}|{success:boolean,error:*}>}
 */
const destroyTodo = async (ctx) => {
  try {
    const id = ctx.params.id;
    await todoRepository.destroy(id);
    return (ctx.body = {
      success: true,
      message: "Delete todo success",
    });
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message:string}|{success:boolean,error:*}>}
 */
const updateTodo = async (ctx) => {
  try {
    const id = ctx.params.id;
    const data = ctx.req.body;
    await todoRepository.update({
      id,
      isCompleted: data.isCompleted,
    });
    return (ctx.body = {
      success: true,
      message: "Update todo success",
    });
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message: string} | {success:boolean, error: *}>}
 */
const updateSelectedTodo = async (ctx) => {
  try {
    const data = ctx.req.body;
    console.log("data", data);
    todoRepository.updateSeleted(data);
    return (ctx.body = {
      success: true,
      message: "Update todo selected success",
    });
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, message: string} | {success:boolean, error:*}>}
 */
const deleteSelectedTodo = async (ctx) => {
  try {
    const data = ctx.req.body;
    await todoRepository.deleteSelected(data.selected);
    return (ctx.body = {
      success: true,
      message: "Delete todo selected success",
    });
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

module.exports = {
  getAllTodo,
  destroyTodo,
  updateTodo,
  updateSelectedTodo,
  deleteSelectedTodo,
  createTodo,
};
