let mongoose = require("mongoose");
let mongoosePaginate = require('mongoose-paginate-v2');

// Creating the schema for user db
var bookSchema = new mongoose.Schema({
    id : Number,
    title : String,
    author : String,
    isbn: String,
    publishedOn: Number,
    numberOfPages: Number
  });

bookSchema.plugin(mongoosePaginate);

// Creating the model from the above schema
var Book = mongoose.model('Book', bookSchema);

// Exporting the model created above
module.exports = Book;