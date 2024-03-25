const pickFields = (obj, fields) => {
  const result = {};
  fields.split(",").forEach((field) => {
    if (obj.hasOwnProperty(field)) {
      result[field] = obj[field];
    }
  });
  return result;
};

module.exports = { pickFields };
