const repositoryRouter = require("./repository.routes.js");

const routes = (app) => {
  app.use("/repositories", repositoryRouter);
};

module.exports = routes;
