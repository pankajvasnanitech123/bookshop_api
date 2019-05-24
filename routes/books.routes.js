let BookController = require('../controllers/book.controller');

let express = require('express');
let bookMgmtRoute = express.Router();

// Route for fetching all the books 
bookMgmtRoute.route('/').get(BookController.getBooks);

// Route for searching the book
bookMgmtRoute.route('/:id').get(BookController.searchBook);

// Route for saving the book 
bookMgmtRoute.route('/').post(BookController.saveBook);

// Route for updating the book 
bookMgmtRoute.route('/:id').put(BookController.updateBook);

// Route for deleting the book 
bookMgmtRoute.route('/:id').delete(BookController.deleteBook);

module.exports = bookMgmtRoute;


