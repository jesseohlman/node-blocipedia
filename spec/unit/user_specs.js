const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models").sequelize;

describe("User unit tests", () => {

    describe("#create", () => {
        beforeEach((done) => {
            sequelize.sync({force: true})
            .then((res) => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })


        it("should create a new user", (done) => {
            User.create({
                name: "John Bron",
                email: "puppers@gmail.com",
                password: "1234567890"
            }).then((user) => {
                User.findOne({where: {id: user.id}})
                .then((res) => {
                    expect(res).not.toBeNull();
                    expect(res.name).toBe("John Bron");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });

        it("should not create a new user with invalid info", (done) => {
            expect(function() {User.create({
                name: "Joe Stow",
                password: "1234567890"
            })}).toThrow();
            done();
            })
        })
    
})
