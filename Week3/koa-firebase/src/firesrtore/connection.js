const db = require("../firesrtore/db");

const connection = async () => {
  await db
    .collection("products")
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("Empty collection");
      } else {
        console.log("Connect FireStore Database Successfull");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
};

module.exports = connection;
