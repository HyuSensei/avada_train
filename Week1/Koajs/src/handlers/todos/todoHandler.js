const todoRepository = require("../../database/todo/todoRepository");

const createTodo = async (ctx) => {
  const addData = ctx.request.body;
  todoRepository.create(addData);
  return (ctx.body = {
    success: true,
    message: "Create todo success",
  });
};

const updateTodo = async (ctx) => {
  const dataBody = ctx.request.body;
  const id = ctx.params.id;
  const dataUpdate = { id, isCompleted: dataBody.isCompleted };
  todoRepository.update(dataUpdate);
  return (ctx.body = {
    success: true,
    message: "Update todo success",
  });
};

const deleteTodo = async (ctx) => {
  const id = ctx.params.id;
  todoRepository.destroy(id);
  return (ctx.body = {
    success: true,
    message: `Delete todo id:${id} success`,
  });
};

const getAll = async (ctx) => {
  const todo = todoRepository.getAll();
  return (ctx.body = {
    success: true,
    todos: todo,
  });
};

const updateTodoSeleted = async (ctx) => {
  const updateData = ctx.request.body;
  todoRepository.updateSeleted(updateData);
  return (ctx.body = {
    success: true,
    message: "Update todo success",
  });
};

const deleteTodoSeleted = async (ctx) => {
  const deleteData = ctx.request.body;
  console.log(deleteData);
  todoRepository.deleteSelected(deleteData.selected);
  return (ctx.body = {
    success: true,
    message: "Delete todo success",
  });
};

module.exports = {
  createTodo,
  updateTodo,
  getAll,
  deleteTodo,
  updateTodoSeleted,
  deleteTodoSeleted,
};
