import React, { useEffect, useState } from "react";
import "./BorrowingBook.css";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import axios from "axios";

const Borrowing = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [borrowData, setBorrowData] = useState({
    bookId: "",
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    returnDate: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleOpen = (bookId) => {
    setBorrowData((prev) => ({ ...prev, bookId }));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBorrowData({
      bookId: "",
      borrowerName: "",
      borrowerMail: "",
      borrowingDate: "",
      returnDate: "",
    });
    setMessage("");
  };

  const handleChange = (e) => {
    setBorrowData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBorrow = () => {
    const updatedBooks = books.map((book) => {
      if (book.id === borrowData.bookId) {
        if (book.stock > 0) {
          book.stock -= 1;
        } else {
          setMessage(" No stock available.");
          return book;
        }
      }
      return book;
    });

    setBooks(updatedBooks);

    setMessage("Book borrowed successfully!✅ ");

    setOpen(false);
  };

  return (
    <>
      <h2>Available Books</h2>
      <div className="book-container">
        {books.map((book, index) => (
          <Paper elevation={3} className="book-card" key={index}>
            <div className="book-info">
              <p className="book-title">📖 {book.name}</p>
              <p className="book-stock">📦 Stock: {book.stock}</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen(book.id)}
                className="borrow-btn"
                disabled={book.stock === 0}
              >
                Borrow
              </Button>
            </div>
          </Paper>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Borrow Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="borrowerName"
            label="Borrower Name"
            type="text"
            fullWidth
            variant="outlined"
            value={borrowData.borrowerName}
            onChange={handleChange}
            className="input-field"
          />
          <TextField
            margin="dense"
            name="borrowerMail"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={borrowData.borrowerMail}
            onChange={handleChange}
            className="input-field"
          />
          <TextField
            margin="dense"
            name="borrowingDate"
            label="Borrowing Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={borrowData.borrowingDate}
            onChange={handleChange}
            className="input-field"
          />
          <TextField
            margin="dense"
            name="returnDate"
            label="Return Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={borrowData.returnDate}
            onChange={handleChange}
            className="input-field"
          />
          {/* Mesajı buraya ekleyin */}
          {message && <p className="message">{message}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleBorrow} color="primary">
            Confirm Borrow
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Borrowing;
