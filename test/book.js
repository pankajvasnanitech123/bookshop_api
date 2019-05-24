process.env.NODE_ENV = 'test';

let mocha = require('mocha');
let describe = mocha.describe;
let beforeEach = mocha.beforeEach;
let it = mocha.it;

let mongoose = require("mongoose");
let Book = require('../models/Book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Books', () => {
    beforeEach((done) => { //Before each test we empty the database
        Book.deleteMany({}, (err) => { 
           done();           
        });        
    });

    /*
    * Test the /GET route
    */
    describe('/GET books', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/books')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                done();
                });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST books', () => {

        // Case 1 : Check if user does not enter the "title" field
        it('it should not POST a book without title field', (done) => {
            let book = {
                "author"         : "Pankaj Ramesh Vasnani",
                "isbn"           : "978-3-16-148410-0",
                "publishedOn"    : 2019,
                "numberOfPages"  : 188
            }
        chai.request(server)
            .post('/books/')
            .send(book)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('title');
                    res.body.error.title.should.have.property('rule').eql('required');
                done();
            });
        });

        // Case 2 : Check if user does not enter the "author" field
        it('it should not POST a book without author field', (done) => {
            let book = {
                "title"          : "React JS Advanced",
                "isbn"           : "978-3-16-148410-0",
                "publishedOn"    : 2019,
                "numberOfPages"  : 188
            }
        chai.request(server)
            .post('/books/')
            .send(book)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('author');
                    res.body.error.author.should.have.property('rule').eql('required');
                done();
            });
        });

        // Case 3 : Check if user does not enter the "isbn" field
        it('it should not POST a book without isbn field', (done) => {
            let book = {
                "title"          : "React JS Advanced",
                "author"         : "Pankaj Ramesh Vasnani",
                "publishedOn"    : 2019,
                "numberOfPages"  : 188
            }
        chai.request(server)
            .post('/books/')
            .send(book)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('isbn');
                    res.body.error.isbn.should.have.property('rule').eql('required');
                done();
            });
        });

        // Case 4 : Check if user does not enter the "publishedOn" field
        it('it should not POST a book without publishedOn field', (done) => {
            let book = {
                "title"          : "React JS Advanced",
                "author"         : "Pankaj Ramesh Vasnani",
                "isbn"           : "978-3-16-148410-0",
                "numberOfPages"  : 188
            }
        chai.request(server)
            .post('/books/')
            .send(book)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('publishedOn');
                    res.body.error.publishedOn.should.have.property('rule').eql('required');
                done();
            });
        });

        // Case 5 : Check if user does not enter the "numberOfPages" field
        it('it should not POST a book without numberOfPages field', (done) => {
            let book = {
                "title"          : "React JS Advanced",
                "author"         : "Pankaj Ramesh Vasnani",
                "isbn"           : "978-3-16-148410-0",
                "publishedOn"    : 2019
            }
        chai.request(server)
            .post('/books/')
            .send(book)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('numberOfPages');
                    res.body.error.numberOfPages.should.have.property('rule').eql('required');
                done();
            });
        });

        // Case 6 : Check if user does not enter the numerical value for "publishedOn" field
        it('it should not POST a book with string type value for publishedOn field', (done) => {
            let book = {
                "title"          : "React JS Advanced",
                "author"         : "Pankaj Ramesh Vasnani",
                "isbn"           : "978-3-16-148410-0",
                "publishedOn"    : "2019sdsdsd",
                "numberOfPages"  : 4500
            }
        chai.request(server)
            .post('/books/')
            .send(book)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('publishedOn');
                    res.body.error.publishedOn.should.have.property('rule').eql('numeric');
                done();
            });
        });

        // Case 7 : Check if user does not enter the numerical value for "numberOfPages" field
        it('it should not POST a book with string type value for numberOfPages field', (done) => {
            let book = {
                "title"          : "React JS Advanced",
                "author"         : "Pankaj Ramesh Vasnani",
                "isbn"           : "978-3-16-148410-0",
                "publishedOn"    : 2019,
                "numberOfPages"  : "adsdsdsd"
            }
        chai.request(server)
            .post('/books/')
            .send(book)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('numberOfPages');
                    res.body.error.numberOfPages.should.have.property('rule').eql('numeric');
                done();
            });
        });

        // Case 8 : Check if user does not enter the numerical value for "publishedOn" and "numberOfPages" fields respectively
        it('it should not POST a book with string type value for publishedOn and numberOfPages fields respectively', (done) => {
            let book = {
                "title"          : "React JS Advanced",
                "author"         : "Pankaj Ramesh Vasnani",
                "isbn"           : "978-3-16-148410-0",
                "publishedOn"    : "2302wjdlasjdas",
                "numberOfPages"  : "adsdsdsd"
            }
        chai.request(server)
            .post('/books/')
            .send(book)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('publishedOn');
                    res.body.error.publishedOn.should.have.property('rule').eql('numeric');
                    res.body.error.should.have.property('numberOfPages');
                    res.body.error.numberOfPages.should.have.property('rule').eql('numeric');
                done();
            });
        });
    });

    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id books', () => {
        // Case 1 : Check if user entered all the details to update the book details
        it('it should UPDATE a book given the id', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2010, numberOfPages: 778})
            book.save((err, book) => {
                chai.request(server)
                .put('/books/' + book._id)
                .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2011, numberOfPages: 778})
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
            });
        });

        // Case 2 : Check if user entered all the details to update the book details without the book title
        it('it should not UPDATE a book given the id without the book title', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2010, numberOfPages: 778})
            book.save((err, book) => {
                chai.request(server)
                .put('/books/' + book._id)
                .send({author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2011, numberOfPages: 778})
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.have.property('title');
                        res.body.error.title.should.have.property('rule').eql('required');
                    done();
                });
            });
        });

        // Case 3 : Check if user entered all the details to update the book details without the book author
        it('it should not UPDATE a book given the id without the book author', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2010, numberOfPages: 778})
            book.save((err, book) => {
                chai.request(server)
                .put('/books/' + book._id)
                .send({title: "The Chronicles of Narnia", isbn: "978-3-16-148410-0", publishedOn: 2011, numberOfPages: 778})
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.have.property('author');
                        res.body.error.author.should.have.property('rule').eql('required');
                    done();
                });
            });
        });

        // Case 4 : Check if user entered all the details to update the book details without the book isbn
        it('it should not UPDATE a book given the id without the book isbn', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2010, numberOfPages: 778})
            book.save((err, book) => {
                chai.request(server)
                .put('/books/' + book._id)
                .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", publishedOn: 2011, numberOfPages: 778})
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.have.property('isbn');
                        res.body.error.isbn.should.have.property('rule').eql('required');
                    done();
                });
            });
        });

        // Case 5 : Check if user entered all the details to update the book details without the book published date
        it('it should not UPDATE a book given the id without the book\'s published date', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2010, numberOfPages: 778})
            book.save((err, book) => {
                chai.request(server)
                .put('/books/' + book._id)
                .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", numberOfPages: 778})
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.have.property('publishedOn');
                        res.body.error.publishedOn.should.have.property('rule').eql('required');
                    done();
                });
            });
        });

        // Case 6 : Check if user entered all the details to update the book details without the book's number of pages
        it('it should not UPDATE a book given the id without the book\'s number of pages', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2010, numberOfPages: 778})
            book.save((err, book) => {
                chai.request(server)
                .put('/books/' + book._id)
                .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2011})
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.have.property('numberOfPages');
                        res.body.error.numberOfPages.should.have.property('rule').eql('required');
                    done();
                });
            });
        });

        // Case 7 : Check if user entered all the details to update the book details without entering the book's published date in numerical format
        it('it should not UPDATE a book given the id without entering the book\'s published date in numerical format', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2010, numberOfPages: 778})
            book.save((err, book) => {
                chai.request(server)
                .put('/books/' + book._id)
                .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: "sdsd", numberOfPages: 778})
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.have.property('publishedOn');
                        res.body.error.publishedOn.should.have.property('rule').eql('numeric');
                    done();
                });
            });
        });

        // Case 8 : Check if user entered all the details to update the book details without entering the book's number of pages in numerical format
        it('it should not UPDATE a book given the id without entering the book\'s number of pages in numerical format', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2010, numberOfPages: 778})
            book.save((err, book) => {
                chai.request(server)
                .put('/books/' + book._id)
                .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2011, numberOfPages: "354ggh"})
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.have.property('numberOfPages');
                        res.body.error.numberOfPages.should.have.property('rule').eql('numeric');
                    done();
                });
            });
        });

        // Case 9 : Check if user entered all the details to update the book details without entering the book's published date and number of pages in numerical format respectively
        it('it should not UPDATE a book given the id without entering the book\'s published date and number of pages in numerical format respectively', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: 2010, numberOfPages: 778})
            book.save((err, book) => {
                chai.request(server)
                .put('/books/' + book._id)
                .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "978-3-16-148410-0", publishedOn: "2011sdsd", numberOfPages: "354ggh"})
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.have.property('publishedOn');
                        res.body.error.publishedOn.should.have.property('rule').eql('numeric');
                        res.body.error.should.have.property('numberOfPages');
                        res.body.error.numberOfPages.should.have.property('rule').eql('numeric');
                    done();
                });
            });
        });
    });

    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id books', () => {
        it('it should GET a book by the given id', (done) => {
            let book = new Book({ title: "React JS Advanced", author: "J.R.R. Tolkien", isbn: "978-3-16-148410-0", publishedOn: 2013, numberOfPages: 3500 });
            book.save((err, book) => {
                chai.request(server)
                .get('/books/' + book._id)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id').eql(book._id.toString());
                    res.body.should.have.property('title');
                    res.body.should.have.property('author');
                    res.body.should.have.property('isbn');
                    res.body.should.have.property('publishedOn');
                    res.body.should.have.property('numberOfPages');
                    done();
                });
            });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id books', () => {
        it('it should DELETE a book given the id', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
            book.save((err, book) => {
                chai.request(server)
                .delete('/books/' + book._id)
                .end((err, res) => {
                        res.should.have.status(204);
                    done();
                });
            });
        });
    });
});