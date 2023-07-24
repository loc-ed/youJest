//I'll get back to this 

require("dotenv").config();
const mongoose = require("mongoose");
const clientRoutes = require("../routes/clientRoutes");
const contactRoutes = require("../routes/contactRoutes")

describe("Connection", () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.CONN_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
  });

  // test("Retrieve client by ID", async () => {
  //   const id = "64bde91ba300bf9e46add468";
  //   const client =  await ClientCtrl.getClient("Apple")
  //   expect(client._id).toBe("64bde78a334219bc17ef71fb");
  // });

  afterEach(async () => {
    await mongoose.connection.close();
});

});