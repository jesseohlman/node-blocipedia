const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000";

describe("routes : users", () => {

    beforeEach((done) => {
        this.user;

        sequelize.sync({force: true})
        .then(() => {
            User.create({
                name: "bobby",
                email:"bool@gmail.com",
                password: "1234567890"
            }).then((user) => {
                this.user = user;
                done();
            })
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe("GET users/signup", () => {
        it("should render the sign up page", (done) => {
            request.get(`${base}/users/signup`, (err, res, body) => {
                expect(body).toContain("Name:");
                done();
            });
        });
    });

    describe("POST users", () => {
        it("should create a new user", (done) => {
            const options = {
                url: `${base}/users`,
                form: {
                name: "gary tom",
                email: "schootz@gmail.com",
                password: "1234567890",
                password_conf: "1234567890"
                }
            };
            request.post(options, (err, res, body) => {
                User.findOne({where: {email: "schootz@gmail.com"}})
                .then((user) => {
                    expect(user).not.toBeNull();
                    expect(user.name).toBe("gary tom");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
            })
        });

        it("should not create a user if there is already a user with that email", (done) => {
           
            const options = {
                url: `${base}/users`,
                form: {
                name: "gary tom",
                email: "bool@gmail.com",
                password: "1234567890",
                password_conf: "1234567890"
                }
            };
            request.post(options, (err, res, body) => {
                User.findOne({where: {name: "gary tom"}})
                .then((user) => {
                    expect(user).toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
            })
        });

        describe("GET /users/signin", () => {
            it("should render a view with the sign in form", (done) => {
                request.get(`${base}/users/signin`, (err, res, body) => {
                    expect(body).toContain("Sign in");
                    expect(body).toContain("email");
                    done();
                })
            });
        });

        describe("POST /users/sign", () => {
            it("should sign a user in if they have an account", (done) => {

                const options = {
                    url : `${base}/users/sign`,
                    form: {
                        email: "bool@gmail.com",
                        password: "1234567890"
                    }
                }
                request.post(options, (err, res, body) => {
                    expect(body.currentUser).not.toBeNull();
                    done();
                })
            });

            it("should flash a message if the provided info is incorrect", (done) => {
                const options = {
                    url : `${base}/users/sign`,
                    form: {
                        email: "bool@gmail.com",
                        password: "wrong password"
                    }
                }
                request.post(options, (err, res, body) => {
                    expect(body.currentUser).toBeUndefined();
                    done();
                })
            })
        })

    });

    describe("GET /users/premium", () => {
        it("should render a view where you can upgrade to premium", (done) => {
            request.get(`${base}/users/premium`, (err, res, body) => {
                expect(body).toContain("Upgrade to premium today!");
            });
        });
    });

    describe("POST /users/upgrade", () => {
        it("should upgrade the current user to premium", () => {
            
        })
    })
})