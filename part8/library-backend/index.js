const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    // return all books with optional filters of author and
    // or genre passed as arg => return Book array
    allBooks: (root, args) => {
      // get all books
      let books = Book.find({}).populate('author')
      // if no filters
      if (!args.author && !args.genre) return books
      // filter author
      if (args.author) {
        books = books.filter(book => book.author.name === args.author)
      }
      // filter genre
      if (args.genre) {
        books = books.filter(book => book.genres.contains(args.genre) === true)
      }

      return books
    },
    allAuthors: () => {
      const bookCount = {}
      for (const author of authors) {
        bookCount[author.name] = null
      }
      for (let book of books) {
        if (bookCount[book.author] === null) {
          bookCount[book.author] = 1
        } else {
          bookCount[book.author]++
        }
      }
      let result = []
      for (let i = 0; i < authors.length; i++) {
        result.push({
          name: authors[i].name,
          born: authors[i].born,
          bookCount: bookCount[authors[i].name]
        })
      }
      return result
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = {...args}
      books.concat(book)
      // see if author is already in system
      const author = authors.find(author => author.name === args.author)
      if (author === undefined) {
        authors.concat(args.author)
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      if (!author) return null
      const updatedAuthor = {...author, born: args.born}
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== process.env.PASSWORD) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ reg }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
})
