const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { WebSocketServer } = require('ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { useServer } = require('graphql-ws/lib/use/ws');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret_key'; 

// Initialize PubSub
const pubsub = new PubSub();
const BOOK_ADDED = 'BOOK_ADDED';
const BOOK_DELETED = 'BOOK_DELETED';

// Dummy data
let authors = [
  { id: '1', name: 'J.K. Rowling' },
  { id: '2', name: 'George R.R. Martin' },
  { id: '3', name: 'J.R.R. Tolkien' },
  { id: '4', name: 'Agatha Christie' },
  { id: '5', name: 'Stephen King' },
];

let books = [
  { id: '1', title: 'Harry Potter and the Sorcerer\'s Stone', authorId: '1' },
  { id: '2', title: 'Game of Thrones', authorId: '2' },
  { id: '3', title: 'The Hobbit', authorId: '3' },
  { id: '4', title: 'Murder on the Orient Express', authorId: '4' },
  { id: '5', title: 'The Shining', authorId: '5' },
]

// Schema
const typeDefs = `#graphql
  type Query {
    authors: [Author]
    books: [Book]
    book(id: ID!): Book
    author(id: ID!): Author
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addBook(title: String!, authorName: String!): Book
    deleteBook(id: ID!): Boolean
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Book {
   id: ID!
   title: String!
   author: Author
  }

  type Author {
   id: ID!
   name: String!
   books: [Book]
  }

  type Subscription {
    bookAdded: Book
    bookDeleted: ID
  }
`;


let users = [];

// Resolvers
const resolvers = {
  Query: {
    authors: () => authors,
    books: () => books,
    book: (_, { id }) => books.find(book => book.id === id),
    author: (_, { id }) => authors.find(author => author.id === id),
  },
  Mutation: {
    signup: (_, { name, email, password }) => {
      const user = { id: Math.random().toString(), name, email, password };
      users.push(user);

      const token = jwt.sign({ userId: user.id }, SECRET_KEY);
      return { token, user };
    },
    login: (_, { email, password }) => {
      const user = users.find(user => user.email === email && user.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ userId: user.id }, SECRET_KEY);
      return { token, user };
    },
    addBook: (_, { title, authorId }) => {
      const newBook = { id: Math.random().toString(), title, authorId };
      books.push(newBook);
      pubsub.publish(BOOK_ADDED, { bookAdded: newBook });
      return newBook;
    },
    addBook: (_, { title, authorName }) => {
      // Check if the author exists
      let author = authors.find((a) => a.name.toLowerCase() === authorName.toLowerCase());
  
      // If not, create a new author
      if (!author) {
        author = { id: Math.random().toString(), name: authorName };
        authors.push(author);
      }
      // Add the book
      const newBook = { id: Math.random().toString(), title, authorId: author.id };
      books.push(newBook);
  
      pubsub.publish(BOOK_ADDED, { bookAdded: newBook });
      return newBook;
    },
    deleteBook: (_, { id }) => {
      const bookIndex = books.findIndex(book => book.id === id);
      if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        pubsub.publish(BOOK_DELETED, { bookDeleted: id });
        return true;
      }
      return false;
    },
  },
  Book: {
    author: (book) => authors.find(author => author.id === book.authorId),
  },
  Author: {
    books: (author) => books.filter(book => book.authorId === author.id),
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator([BOOK_ADDED]),
    },
    bookDeleted: {
      subscribe: () => pubsub.asyncIterableIterator([BOOK_DELETED]),
    },
  },
  
};

// Create schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Express server setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

const httpServer = http.createServer(app);

// WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

useServer({ schema }, wsServer);

// Apollo Server setup
const server = new ApolloServer({
  schema,
});

server.start().then(() => {
  app.use('/graphql', expressMiddleware(server));
  httpServer.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
});




