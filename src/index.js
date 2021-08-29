const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.info("Connected to MongoDB");
  server = app.listen(8082, () => {
    console.info(`App is running on port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
