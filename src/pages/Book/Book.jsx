import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./Book.css";

const initialBook = {
  name: "",
  stock: "",
  publicationYear: "",
};

const Book = () => {
  const [newBook, setNewBook] = useState(initialBook);
  const [books, setBooks] = useState(null);
  const [update, setUpdate] = useState(false);
  const [updateBook, setUpdateBook] = useState(initialBook);

  useEffect(() => {
    const request = async () => {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/api/v1/books"
      );
      setBooks(res.data);
      setUpdate(true);
    };
    request();
  }, [update]);

  const handleBookPost = async () => {
    await axios.post(import.meta.env.VITE_BASE_URL + "/api/v1/books", newBook);
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setNewBook(initialBook);
  };

  const handleBookDelete = async (id) => {
    const response = await axios.delete(
      import.meta.env.VITE_BASE_URL + `/api/v1/books/${id}`
    );
    setUpdate(false);
  };

  const handleUpdateForm = (book) => {
    setUpdateBook(book);
    console.log(book);
  };

  const handleBookUpdate = async () => {
    await axios.put(
      import.meta.env.VITE_BASE_URL + `/api/v1/books/${updateBook.id}`,
      updateBook
    );
    setUpdateBook(initialBook);
    setUpdate(false);
  };

  return (
    <div className="books-container">
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        New Book
      </Typography>

      {/* NEW BOOK */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {Object.keys(initialBook).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            label={key}
            variant="standard"
            value={newBook[key]}
            onChange={(e) =>
              setNewBook((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button
          variant="contained"
          onClick={handleBookPost}
          style={{ backgroundColor: "green" }}
        >
          Add New Book
        </Button>
      </div>

      {/* UPDATE BOOK */}
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px", marginTop: "3rem" }}
      >
        Update Book
      </Typography>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {Object.keys(initialBook).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            label={key}
            variant="standard"
            value={updateBook[key]}
            onChange={(e) =>
              setUpdateBook((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button variant="contained" onClick={handleBookUpdate}>
          Update Book
        </Button>
      </div>

      <TableContainer component={Paper} style={{ marginTop: "3rem" }}>
        <Table>
          <TableHead>
            <TableRow className="table-row">
              <TableCell align="center">Book Name</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Publication Year</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <TableCell align="center">{book.name}</TableCell>
                <TableCell align="center">{book.stock}</TableCell>
                <TableCell align="center">{book.publicationYear}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowUpwardIcon />}
                    onClick={() => handleUpdateForm(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleBookDelete(book.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Book;
