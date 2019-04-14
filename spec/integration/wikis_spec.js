const request = require("request");
const sequelize = require("../../src/db/models/index").sequelize;
const server = require("../../src/server");


const base = "http://localhost:3000"
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
                    body: "wub wub wub wub",
                    userId: this.user.id
                })
                .then((wiki) => {
                    this.wiki = wiki;
                    done();
                    });
                });
        
        });
    });


    describe("GET /wikis", () => {
        it("should display a all the wiki's titles", (done) => {
            request.get(`${base}/wikis`, (err, res, body) => {
                expect(body).toContain("House");
                done();
            })
        })
    });

    describe("GET /wikis/new", () => {
        it("should display a form to create a new wiki", (done) => {
            request.get(`${base}/wikis/new`, (err, res, body) => {
                expect(body).toContain("New Wiki");
                done();
            })
        });
    });

    describe("GET /wikis/:id", () => {
        it("should display the body and title of wiki", (done) => {
            request.get(`${base}/wikis/${this.wiki.id}`, (err, res, body) => {
                expect(body).toContain("House");
                expect(body).toContain("wub wub wub wub");
                done();
            })
        })
    });

    describe("GET /wikis/:id/edit", () => {
        it("should show the wiki infomration and the user should be able to edit it", (done) => {
            request.get(`${base}/wikis/${this.wiki.id}/edit`, (err, res, body) => {
                expect(body).toContain("House");
                expect(body).toContain("wub wub wub wub");
                expect(body).toContain("Update");
                done();

            })
        })
    });



    describe("Owner performing CRUD actions on their wikis", () => {
       
        beforeEach((done) => {
            request.get({           
                url: "http://localhost:3000/auth/fake",
                form: {
                  role: "standard",     
                  userId: this.user.id,
                }
              },
                (err, res, body) => {
                  done();
                }
              );
        });

        describe("POST /wikis/create", () => {
            it("should create a new post", (done) => {
                const options = {
                    url: `${base}/wikis/create`,
                    form: {
                        title: "New wiki",
                        body: "Wiki body"
                    }
                };
    
                request.post(options, (err, res, body) => {
                    Wiki.findOne({ where: { title: "New wiki"}})
                    .then((wiki) => {
                        expect(wiki.title).toBe("New wiki");
                        expect(wiki.body).toBe("Wiki body");
                        done();
                    })
                })
            })
        });
        
        
        describe("GET /wikis/:id/edit", () => {
            it("should show the wiki infomration and the user should be able to edit it", (done) => {
                request.get(`${base}/wikis/${this.wiki.id}/edit`, (err, res, body) => {
                    expect(body).toContain("House");
                    expect(body).toContain("wub wub wub wub");
                    expect(body).toContain("Update");
                    done();
    
                })
            })
        });
    
    
        describe("POST /wikis/:id/update", () => {
            it("should update the wiki with the given values", (done) => {
                const options = {
                    url: `${base}/wikis/${this.wiki.id}/update`,
                    form: {
                        title: "new title",
                        body: "new body"
                    }
                };
    
                request.post(options, (err, res, body) => {
                    expect(err).toBeNull();
                   
                    Wiki.findOne({where: {
                        id: this.wiki.id
                    }})
                    .then((wiki) => {
                        expect(wiki).not.toBeNull();
                        expect(wiki.title).toBe("new title");
                        done();
                    })
                })
            });
        });
    
        describe("POST /wikis/:id/destroy", () => {
            it("should delete the given post", (done) => {
                request.post(`${base}/wikis/${this.wiki.id}/destroy`, (err, res, body) => {
                    expect(err).toBeNull();
    
                    Wiki.findOne(( {where: {id: this.wiki.id}}))
                    .then((wiki) => {
                        expect(wiki).toBeNull();
                        done();
                    })
                })
            });
        });

    }); //end owner tests

    describe("user performing CRUD on other users' wikis", () => {
        beforeEach((done) => {
            User.create({
                name: "andy",
                email: "taco@gmail.com",
                password: "1234567890"
            }).then((user) => {
                this.user = user;
                request.get({           
                    url: "http://localhost:3000/auth/fake",
                    form: {
                      role: "standard",     
                      userId: this.user.id,
                    }
                  },
                    (err, res, body) => {
                      done();
                    }
                  );
            })
        });
    
    
        describe("POST /wikis/:id/update", () => {
            it("should not update the wiki with the given values", (done) => {
                const options = {
                    url: `${base}/wikis/${this.wiki.id}/update`,
                    form: {
                        title: "new title",
                        body: "new body"
                    }
                };
    
                request.post(options, (err, res, body) => {
                    expect(err).toBeNull();
                   
                    Wiki.findOne({where: {
                        id: this.wiki.id
                    }})
                    .then((wiki) => {
                        expect(wiki).not.toBeNull();
                        expect(wiki.title).toBe("House");
                        done();
                    })
                })
            });
        });
    
        describe("POST /wikis/:id/destroy", () => {
            it("should not delete the given post", (done) => {
                request.post(`${base}/wikis/${this.wiki.id}/destroy`, (err, res, body) => {
                    expect(err).toBeNull();
    
                    Wiki.findOne(( {where: {id: this.wiki.id}}))
                    .then((wiki) => {
                        expect(wiki).not.toBeNull();
                        done();
                    })
                })
            });
        });

    }); //end foreigner tests
})
