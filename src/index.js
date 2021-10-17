const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const expressListRoutes = require("express-list-routes");

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

expressListRoutes(app);

module.exports = app;
