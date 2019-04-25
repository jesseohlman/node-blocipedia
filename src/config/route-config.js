

module.exports = {
    init(app){
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");
        const wikiRoutes = require("../routes/wikis");
        const collabRoutes = require("../routes/collaborators");

        if(process.env.NODE_ENV === "test") {
            const mockAuth = require("../../spec/auth/mock-auth.js");
            mockAuth.fakeIt(app);
        }

        app.use(collabRoutes);
        app.use(wikiRoutes);
        app.use(userRoutes);
        app.use(staticRoutes);
    }
}