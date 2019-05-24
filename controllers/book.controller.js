let Book = require('../models/Book.js');
let v = require('node-input-validator');

/**
 * Get all the books
 * @param req
 * @param res
 * @returns void
 */
function getBooks(req, res) {
    // Query the DB and if no errors, send all the books
    let query = Book.find({});
    query.exec((err, books) => {
        if(err) {
            res.status(500).send('Internal Server Error');
        } else {
            //If no errors, send them back to the client
            res.status(200).json({"error": null, "data": books, "message": "Success"});
        }
    });
}

/**
 * Search the book
 * @param req
 * @param res
 * @returns void
 */
function searchBook(req, res) {
    let bookId = req.params.id;

    Book.findById(bookId, function(err, book) {
        if(err){
            res.status(500).send('Internal Server Error');
        }
        else {
            if (book.length == 0) {
                res.status(404).send('Data not found');
            } else {
                res.status(200).json(book);
            }
        }
    });
}

/**
 * Store the book
 * @param req
 * @param res
 * @returns void
 */
function saveBook(req, res) {
    // Validate the form input data
    let validator = new v( req.body, 
        {
            title:'required',
            author: 'required',
            isbn:'required',
            publishedOn:'required|numeric',
            numberOfPages:'required|numeric'
        },
        {
            'title.required'         : 'Please enter book title.',
            'author.required'        : 'Please enter book author.',
            'isbn.required'          : 'Please enter book isbn.',
            'publishedOn.required'   : 'Please enter the publication date of the book.',
            'publishedOn.numeric'    : 'Please enter the publication date in numerical format.',
            'numberOfPages.required' : 'Please enter number of pages of the book.',
            'numberOfPages.numeric'  : 'Please enter the number of pages in numerical format.'
        }
    );
 
    validator.check().then(function (matched) {
        if (!matched) {
            res.status(400).json({"error": validator.errors, "data": [], "message": "Error"});
        } else {
            let book = new Book(req.body);
            
            book.save()
                .then(book => {
                    res.status(201).json({"error": null, "data": {"id": book._id}, "message": "Book successfully saved"});
                })
                .catch(err => {
                    res.status(500).send('Internal Server Error');
                });
        }
    });
}

/**
 * Update the book
 * @param req
 * @param res
 * @returns void
 */
function updateBook(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (!book) {
            res.status(404).send("data is not found");
        } else {
            // Validate the form input data
            let validator = new v( req.body, 
                {
                    title:           'required',
                    author:          'required',
                    isbn:            'required',
                    publishedOn:     'required|numeric',
                    numberOfPages:   'required|numeric'
                },
                {
                    'title.required'         : 'Please enter book title.',
                    'author.required'        : 'Please enter book author.',
                    'isbn.required'          : 'Please enter book isbn.',
                    'publishedOn.required'   : 'Please enter the publication date of the book.',
                    'publishedOn.numeric'    : 'Please enter the publication date in numerical format.',
                    'numberOfPages.required' : 'Please enter number of pages of the book.',
                    'numberOfPages.numeric'  : 'Please enter the number of pages in numerical format.'
                }
            );
        
            validator.check().then(function (matched) {
                if (!matched) {
                    // Show the errors
                    res.status(400).json({"error": validator.errors, "data": [], "message": "Error"});
                } else {
                    // Update the book details
                    book.title         = req.body.title;
                    book.author        = req.body.author;
                    book.isbn          = req.body.isbn;
                    book.publishedOn   = parseInt(req.body.publishedOn);
                    book.numberOfPages = parseInt(req.body.numberOfPages);
                    
                    book.save().then(book => {
                        res.status(204).json(null);
                    })
                    .catch(err => {
                        res.status(500).send('Internal Server Error');
                    });
                }
            });
        }
    });
}

/**
 * Delete the book
 * @param req
 * @param res
 * @returns void
 */
function deleteBook(req, res) {
    Book.findByIdAndRemove(req.params.id, function(err, book){
        if(err) 
            res.status(500).send('Internal Server Error');
        else 
            res.status(204).json(null);
    });
}

module.exports = {
    "getBooks"   : getBooks,
    "saveBook"   : saveBook,
    "updateBook" : updateBook,
    "deleteBook" : deleteBook,
    "searchBook" : searchBook
};