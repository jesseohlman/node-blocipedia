const request = require("request");
const sequelize = require("../../src/db/models/index").sequelize;
const server = require("../../src/server");

const base = "http://localhost:3000/"
const User = require("../../src/db/models").User;
const Wiki = require("../../src/db/models").Wiki;


describe("routes:wikis", () => {

    beforeEach((done) => {
        this.user;
        this.wiki;

        sequelize.sync({force: true})
        .then(() => {
            User.create({
                name: "John Brock",
                email: "bigboy@gmail.com",
                password: "1234567890"
            })
            .then((user) =>{
                this.user = user;

                Wiki.create({
                    title: "House",
                    body: "wub wub wub",
                    userId: this.user.id
                })
                .then((wiki) => {
                    this.wiki = wiki;
                })
            })
        })
    })

    describe("GET /wikis", () => {
        it("should display a all the wiki's titles", (done) => {
            request.get(`${base}wikis`, (err, res, body) => {
                expect(body).toContain("House");
                done();
            })
        })
    });

    describe("GET /wikis/new", () => {
        it("should display a form to create a new wiki", (done) => {
            request.get(`${base}wikis/new`, (err, res, body) => {
                expect(body).toContain("New Wiki");
                done();
            })
        });
    });

    describe("GET /wikis/:id", () => {
        it("should display the body and title of wiki", (done) => {
            request.get(`${base}wikis/${this.wiki.id}`, (err, res, body) => {
                expect(body).toContain("House");
                expect(body).toContain("wub wub wub");
                done();
            })
        })
    });

    describe("GET /wikis/:id/edit", () => {
        it("should show the wiki infomration and the user should be able to edit it", (done) => {
            request.get(`${base}wikis/${this.wiki.id}/edit`, (err, res, body) => {
                expect(body).toContain("House");
                expect(body).toContain("wub wub wub");
                expect(body).toContain("Update");
                done();

            })
        })
    })
})
