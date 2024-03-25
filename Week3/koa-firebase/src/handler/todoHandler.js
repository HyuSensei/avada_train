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
    if (todo) {
      return (ctx.body = {
        success: true,
        message: "Create todo success",
        todo: todo,
      });
    }
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
    const todos = await todoRepository.getAll();
    if (todos) {
      return (ctx.body = {
        success: true,
        message: "Get all todos list",
        todos: todos,
      });
    }
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
    const res = await todoRepository.destroy(id);
    if (res) {
      return (ctx.body = {
        success: true,
        message: "Delete todo success",
      });
    }
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
    const res = await todoRepository.update({
      id,
      isCompleted: data.isCompleted,
    });
    if (res) {
      return (ctx.body = {
        success: true,
        message: "Update todo success",
      });
    }
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
    const res = await todoRepository.updateSeleted(data);
    if (res) {
      return (ctx.body = {
        success: true,
        message: "Update todo selected success",
      });
    }
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
    const res = await todoRepository.deleteSelected(data.selected);
    if (res) {
      return (ctx.body = {
        success: true,
        message: "Delete todo selected success",
      });
    }
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
