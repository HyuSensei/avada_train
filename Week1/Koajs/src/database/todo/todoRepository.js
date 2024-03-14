const fs = require("fs");
const { data: todo } = require("./todo.json");
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
  const listWork = [addData, ...todo];
  const filePath = path.join(__dirname, "todo.json");
  return fs.writeFileSync(
    filePath,
    JSON.stringify({
      data: listWork,
    })
  );
};

const update = (data) => {
  const indexTodo = todo.findIndex((item) => item.id === parseInt(data.id));
  console.log(data);
  if (indexTodo !== -1) {
    if (data.isCompleted === true) {
      todo[indexTodo] = { ...todo[indexTodo], isCompleted: true, updatedAt };
    } else {
      todo[indexTodo] = { ...todo[indexTodo], isCompleted: false, updatedAt };
    }
    const filePath = path.join(__dirname, "todo.json");
    return fs.writeFileSync(
      filePath,
      JSON.stringify({
        data: todo,
      })
    );
  }
};

const getAll = () => {
  return todo;
};

const destroy = (id) => {
  const newTodo = todo.filter((item) => item.id !== parseInt(id));
  const filePath = path.join(__dirname, "todo.json");
  return fs.writeFileSync(
    filePath,
    JSON.stringify({
      data: newTodo,
    })
  );
};

const updateSeleted = (data) => {
  const listWork = data.selected;
  const updateTodo = todo.map((item) => {
    if (listWork.includes(item.id)) {
      return {
        ...item,
        isCompleted: data.isCompleted,
        updatedAt,
      };
    }
    return item;
  });
  const filePath = path.join(__dirname, "todo.json");
  return fs.writeFileSync(
    filePath,
    JSON.stringify({
      data: updateTodo,
    })
  );
};

const deleteSelected = (seleted) => {
  const newTodo = todo.filter((item) => !seleted.includes(item.id));
  const filePath = path.join(__dirname, "todo.json");
  return fs.writeFileSync(
    filePath,
    JSON.stringify({
      data: newTodo,
    })
  );
};

module.exports = {
  create,
  update,
  getAll,
  destroy,
  updateSeleted,
  deleteSelected,
};
