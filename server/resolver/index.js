const Author = require('../models/author');
const Book = require('../models/book');

const books = [
];

const authors = [];

const resolvers = {
  Query: {
    books: async (parent, args, context) => await context.mongoDataMethods.getAllBooks(),
    book: async (parent, { id }, { mongoDataMethods }) => await mongoDataMethods.getBookById(id),
    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    author: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(id)
  },
  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(authorId)
  },
  Author: {
    books: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: id })
  },

  // Mutation
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createAuthor(args),
    createBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createBook(args)
  }
};

module.exports = resolvers;
