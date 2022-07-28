const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
//handling uncaughtException
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Server is shutting down due to uncaughtException");
  process.exit(1);
});
//config
dotenv.config({ path: "backend/config/config.env" });
//database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
//Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Server is shutting down due to unhanldedRejection");

  server.close(() => {
    process.exit(1);
  });
});
