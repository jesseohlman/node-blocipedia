

module.exports = {
    init(app){
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");
        const wikiRoutes = require("../routes/wikis");

        if(process.env.NODE_ENV === "test") {
            const mockAuth = require("../../spec/auth/mock-auth.js");
            mockAuth.fakeIt(app);
        }

        app.use(wikiRoutes);
        app.use(userRoutes);
        app.use(staticRoutes);
    }
}