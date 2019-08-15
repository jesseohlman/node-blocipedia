const express = require("express");
const mainConfig = require("./config/main-config");
const routeConfig = require("./config/route-config");
const mainRoute = require("./routes/static");
const app = express();

mainConfig.init(app, express);
routeConfig.init(app);

app.use('/', mainRoute);

module.exports = app;