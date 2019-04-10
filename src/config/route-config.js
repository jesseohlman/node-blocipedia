

module.exports = {
    init(app){
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");
        const wikiRoutes = require("../routes/wikis");

        app.use(wikiRoutes);
        app.use(userRoutes);
        app.use(staticRoutes);
    }
}