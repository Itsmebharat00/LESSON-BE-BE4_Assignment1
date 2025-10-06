/** @format */

const { initializingDatabase } = require("./db/db.connect");
const express = require("express");
const Books = require("./models/book.models");
const express = require("express");
initializingDatabase();
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// 1. Create an API with route "/books" to create a new book data in the books Database. Make sure to do error handling. Test your API with Postman. Add the following book:

const bookData = {
  title: "Lean In",
  author: "Sheryl Sandberg",
  publishedYear: 2012,
  genre: ["Non-fiction", "Business"],
  language: "English",
  country: "United States",
  rating: 4.1,
  summary:
    "A book about empowering women in the workplace and achieving leadership roles.",
  coverImageUrl: "https://example.com/lean_in.jpg",
};

async function createBookData(bookData) {
  try {
    const books = new Books(bookData);
    const savedBooks = await books.save();
    return savedBooks;
  } catch (error) {
    console.log("Error in creating Books data:", error);
    throw error;
  }
}

// app.post("/books", async (req, res) => {
//   try {
//     const savedBooks = await createBookData(req.body);
//     if (savedBooks) {
//       res
//         .status(201)
//         .json({ message: "Books added successfully", book: savedBooks });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add book data" });
//   }
// });

// 2. Run your API and create another book data in the db.

const newBook = {
  title: "Shoe Dog",
  author: "Phil Knight",
  publishedYear: 2016,
  genre: ["Autobiography", "Business"],
  language: "English",
  country: "United States",
  rating: 4.5,
  summary:
    "An inspiring memoir by the co-founder of Nike, detailing the journey of building a global athletic brand.",
  coverImageUrl: "https://example.com/shoe_dog.jpg",
};

async function createNewBook(newBook) {
  try {
    const books = new Books(newBook);
    const savedBooks = await books.save();
    return savedBooks;
  } catch (error) {
    console.log("Error in creating Books data:", error);
    throw error;
  }
}

app.post("/newBooks", async (req, res) => {
  try {
    const savedBooks = await createNewBook(req.body);
    if (savedBooks) {
      res
        .status(201)
        .json({ message: "Books added successfully", book: savedBooks });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add book data" });
  }
});

// 3. Create an API to get all the books in the database as response. Make sure to do error handling.

async function readAllBooks() {
  try {
    const allBooks = await Books.find();
    return allBooks;
  } catch (error) {
    console.log("Error in fetching books:", error);
    throw error;
  }
}

app.get("/books", async (req, res) => {
  try {
    const books = await readAllBooks();
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "book not found." });
    }
  } catch (error) {
    console.log("Error in fetching all books:", error);
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

// 4. Create an API to get a book's detail by its title. Make sure to do error handling.

async function readBookByTitle(title) {
  try {
    const book = await Books.findOne({ title: title });
    return book;
  } catch (error) {
    console.log("Error in fetching book by title:", error);
    throw error;
  }
}

app.get("/books/title/:title", async (req, res) => {
  try {
    const book = await readBookByTitle(req.params.title);
    if (book) {
      res.status(200).json({ message: "Book found", book });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book data" });
  }
});

// 5. Create an API to get details of all the books by an author. Make sure to do error handling.

async function readBooksByAuthor(author) {
  try {
    const books = await Books.find({ author: author });
    return books;
  } catch (error) {
    console.log("Error in fetching books by author:", error);
    throw error;
  }
}

app.get("/books/author/:author", async (req, res) => {
  try {
    const books = await readBooksByAuthor(req.params.author);
    if (books.length > 0) {
      res.status(200).json({ message: "Books found", books });
    } else {
      res.status(404).json({ error: "No books found for this author" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books data" });
  }
});

// 6. Create an API to get all the books which are of "Business" genre.

async function readBooksByGenre(genre) {
  try {
    const books = await Books.find({ genre: genre });
    return books;
  } catch (error) {
    console.log("Error in fetching books by genre:", error);
    throw error;
  }
}

app.get("/books/genre/business", async (req, res) => {
  try {
    const books = await readBooksByGenre("Business");
    if (books.length > 0) {
      res.status(200).json({ message: "Books found", books });
    } else {
      res.status(404).json({ error: "No books found in Business genre" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books data" });
  }
});

// 7. Create an API to get all the books which was released in the year 2012.

async function readBooksByYear(year) {
  try {
    const books = await Books.find({ publishedYear: year });
    return books;
  } catch (error) {
    console.log("Error in fetching books by year:", error);
    throw error;
  }
}

app.get("/books/year/2012", async (req, res) => {
  try {
    const books = await readBooksByYear(2012);
    if (books.length > 0) {
      res.status(200).json({ message: "Books found", books });
    } else {
      res.status(404).json({ error: "No books found for the year 2012" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books data" });
  }
});

// 8. Create an API to update a book's rating with the help of its id. Update the rating of the "Lean In" from 4.1 to 4.5. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.
// Updated book rating: { "rating": 4.5 }

async function updateBookById(bookId, dataToUpdate) {
  try {
    const updateBooks = await Books.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updateBooks;
  } catch (error) {
    console.log("Error in updating book by ID:", error);
  }
}

app.post("/books/:bookId", async (req, res) => {
  try {
    const bookByRating = await updateBookById(req.params.bookId, req.body);
    if (bookByRating) {
      res.status(200).json({ message: "Book updated successfully" });
    } else {
      res.status(404).json({ error: "Book not found by ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});
// 68bd1c821df76dc7ac945bf5

// 9. Create an API to update a book's rating with the help of its title. Update the details of the book "Shoe Dog". Use the query .findOneAndUpdate() for this. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.
// Updated book data: { "publishedYear": 2017, "rating": 4.2 }

async function readByBookTitle(bookTitle, dataToUpdate) {
  try {
    const bookByTitle = await Books.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      { new: true }
    );
    return bookByTitle;
  } catch (error) {
    console.log("Error in fetching book by title:", error);
    throw error;
  }
}
// readByBookTitle("Shoe Dog", { publishedYear: 2017, rating: 4.2 });

// 10. Create an API to delete a book with the help of a book id, Send an error message "Book not found" in case the book does not exist. Make sure to do error handling.

async function deleteBookById(bookId) {
  try {
    const deletedBooks = await Books.findByIdAndDelete(bookId);
    return deletedBooks;
  } catch (error) {
    console.log(error);
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBooks = await deleteBookById(req.params.bookId);
    if (deletedBooks) {
      res.status(200).json({ message: "Book deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
