module.exports = {
    fakeIt(app){
        
        let role, id, email, name;

        function middleware(req, res, next){
            role = req.body.role || role;
            id = req.body.userId || id;
            email = req.body.email || email;
            name = req.body.name || name;

            if(id && id != 0){
                req.user = {
                    "id": id,
                    "email": email,
                    "role": role,
                    "name": name,
                };
            } else if(id === 0) {
                delete req.user;
            }

            if(next){next()}
        }

        function route(req, res){
            res.redirect("/")
        }

        app.use(middleware)
        app.get("/auth/fake", route)
    }
}