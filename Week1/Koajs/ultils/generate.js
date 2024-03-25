const createId = () => {
  const id = Math.floor(Math.random() * 10000);
  return id;
};

const createDate = () => {
  const date = new Date();
  return date;
};
module.exports = { createId, createDate };
