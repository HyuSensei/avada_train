const fs = require("fs");
const { data: todos } = require("./todo.json");
const ultils = require("../../../ultils/generate");
const path = require("path");

const updatedAt = ultils.createDate();
const create = (data) => {
  const id = ultils.createId();
  const createdAt = ultils.createDate();
  const addData = {
    id,
    title: data.title,
    isCompleted: data.isCompleted,
    createdAt,
    updatedAt,
  };
  const newTodo = [addData, ...todos];
  const filePath = path.join(__dirname, "todo.json");
  fs.writeFileSync(
    filePath,
    JSON.stringify({
      data: newTodo,
    })
  );
  const todo = newTodo.find((item) => item.id === parseInt(id));
  console.log("todo:", todo);
  return todo;
};

const update = (data) => {
  const indextodos = todos.findIndex((item) => item.id === parseInt(data.id));
  console.log(data);
  if (indextodos !== -1) {
    if (data.isCompleted === true) {
      todos[indextodos] = {
        ...todos[indextodos],
        isCompleted: true,
        updatedAt,
      };
    } else {
      todos[indextodos] = {
        ...todos[indextodos],
        isCompleted: false,
        updatedAt,
      };
    }
    const filePath = path.join(__dirname, "todo.json");
    fs.writeFileSync(
      filePath,
      JSON.stringify({
        data: todos,
      })
    );
    return todos;
  }
};

const getAll = () => {
  return todos;
};

const destroy = (id) => {
  const newtodos = todos.filter((item) => item.id !== parseInt(id));
  const filePath = path.join(__dirname, "todo.json");
  return fs.writeFileSync(
    filePath,
    JSON.stringify({
      data: newtodos,
    })
  );
};

const updateSeleted = (data) => {
  const listTodo = data.selected;
  const updateTodos = todos.map((item) => {
    if (listTodo.includes(item.id)) {
      return {
        ...item,
        isCompleted: data.isCompleted,
        updatedAt,
      };
    }
    return item;
  });
  const filePath = path.join(__dirname, "todo.json");
  fs.writeFileSync(
    filePath,
    JSON.stringify({
      data: updateTodos,
    })
  );
  return updateTodos;
};

const deleteSelected = (seleted) => {
  const newtodos = todos.filter((item) => !seleted.includes(item.id));
  const filePath = path.join(__dirname, "todo.json");
  fs.writeFileSync(
    filePath,
    JSON.stringify({
      data: newtodos,
    })
  );
  return newtodos;
};

module.exports = {
  create,
  update,
  getAll,
  destroy,
  updateSeleted,
  deleteSelected,
};
