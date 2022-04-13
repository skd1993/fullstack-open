const { UserInputError, AuthenticationError } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');
const { Book, Author, User } = require('./schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let author_id;
      if (args.name) {
        let a = await Author.find({ name: args.name });
        if (a.length > 0) author_id = a[0].id;
        else
          throw new UserInputError(
            'Author not be found, please check the name'
          );
      }
      if (author_id && args.genre) {
        return await Book.find({
          author: author_id,
          genres: { $in: [args.genre] },
        }).populate('author', {
          name: 1,
          born: 1,
          bookCount: 1,
        });
      } else if (author_id && !args.genre) {
        return await Book.find({
          author: author_id,
        }).populate('author', {
          name: 1,
          born: 1,
          bookCount: 1,
        });
      } else if (args.genre && !author_id) {
        return await Book.find({
          genres: { $in: [args.genre] },
        }).populate('author', {
          name: 1,
          born: 1,
          bookCount: 1,
        });
      } else {
        return await Book.find({}).populate('author', {
          name: 1,
          born: 1,
          bookCount: 1,
        });
      }
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      return currentUser;
    },
    genres: async (root, args) => {
      const books = await Book.find();
      let gList = [];
      books.forEach((book) => {
        book.genres.forEach((g) => {
          const isPresent = gList.includes(g);
          if (!isPresent) gList = [...gList, g];
        });
      });
      return gList;
    },
  },
  Author: {
    bookCount: async (root) => await Book.find({ author: root.id }).count(),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = args.author;

      if (author.length < 4) {
        throw new UserInputError(
          'Author name length should not be less than 4 characters'
        );
      }

      if (args.title < 2) {
        throw new UserInputError(
          'Book title name length should not be less than 2 characters'
        );
      }

      if (args.published > new Date().getFullYear()) {
        throw new UserInputError(
          'Published year cannot be greated than current year'
        );
      }

      let isExisting = await Author.findOne({ name: author });

      if (!isExisting) {
        try {
          const authorToAdd = await new Author({ name: author, bookCount: 1 });
          isExisting = await authorToAdd.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            inValidArgs: args,
          });
        }
      }

      try {
        const bookToAdd = await new Book({
          ...args,
          author: isExisting.id,
        }).populate('author', { name: 1, id: 1, born: 1, bookCount: 1 });
        return bookToAdd.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          inValidArgs: args,
        });
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const authorToEdit = await Author.findOne({ name: args.name });
      if (authorToEdit) {
        if (args.setBornTo > new Date().getFullYear() - 15) {
          throw new UserInputError(
            'Author age should not be less than 15 years old'
          );
        }
        authorToEdit.born = args.setBornTo;
        try {
          return authorToEdit.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            inValidArgs: args,
          });
        }
      } else {
        throw new UserInputError('Author not be found, please check the name');
      }
      return null;
    },

    createUser: async (root, args) => {
      const { username, password, favoriteGenre } = args;
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = new User({
        username,
        passwordHash,
        favoriteGenre: favoriteGenre || null,
      });
      return await user.save();
    },

    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);
      if (!(user && passwordCorrect)) {
        throw new UserInputError('invalid username or password');
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      const token = jwt.sign(userForToken, process.env.SECRET);
      return { value: token };
    },
  },
};
