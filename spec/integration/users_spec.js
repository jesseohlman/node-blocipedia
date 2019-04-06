const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

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
            request.get(`${base}users/signup`, (err, res, body) => {
                expect(body).toContain("Name:");
                done();
            });
        });
    });

    describe("POST users", () => {
        it("should create a new user", (done) => {
            const options = {
                url: `${base}users`,
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
                url: `${base}users`,
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


    })
})