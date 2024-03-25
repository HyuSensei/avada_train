const { faker } = require("@faker-js/faker");
const fs = require("fs");
const createRandomUser = () => {
  return {
    id: Math.floor(faker.datatype.number()),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    product: faker.commerce.productName(),
    color: faker.vehicle.color(),
    createdAt: faker.date.past(),
    image: faker.image.url(),
  };
};

const PRODUCTS = faker.helpers.multiple(createRandomUser, {
  count: 1000,
});

fs.writeFileSync(
  "../src/database/products.json",
  JSON.stringify({
    data: PRODUCTS,
  })
);
