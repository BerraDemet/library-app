import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
} from "@mui/material";
import axios from "axios";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Author.css";

const initialAuthor = {
  name: "",
  birthDate: "",
  country: "",
};

const Author = () => {
  const [newAuthor, setNewAuthor] = useState(initialAuthor);
  const [authors, setAuthors] = useState([]);
  const [updateAuthor, setUpdateAuthor] = useState(initialAuthor);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/authors"
        );
        setAuthors(res.data);
      } catch (error) {
        console.error(
          "Error fetching authors:",
          error.response?.data || error.message
        );
      }
    };

    fetchAuthors();
  }, []);

  const handleAuthorPost = async () => {
    try {
      console.log("Gönderilecek veri:", newAuthor);

      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/authors",
        JSON.stringify(newAuthor),
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Eklenen yazar:", res.data);
      setAuthors((prev) => [...prev, res.data]);
      setNewAuthor(initialAuthor);
    } catch (error) {
      console.error(
        "Error adding author:",
        error.response?.data || error.message
      );
    }
  };

  const handleAuthorDelete = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BASE_URL + `/api/v1/authors/${id}`
      );
      setAuthors((prev) => prev.filter((author) => author.id !== id));
    } catch (error) {
      console.error(
        "Error deleting author:",
        error.response?.data || error.message
      );
    }
  };

  const handleUpdateForm = (author) => {
    setUpdateAuthor({ ...author });
  };

  const handleAuthorUpdate = async () => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_BASE_URL + `/api/v1/authors/${updateAuthor.id}`,
        updateAuthor
      );

      setAuthors((prev) =>
        prev.map((author) =>
          author.id === updateAuthor.id ? res.data : author
        )
      );

      setUpdateAuthor(initialAuthor);
    } catch (error) {
      console.error(
        "Error updating author:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Author Management
      </Typography>

      {/* NEW AUTHOR FORM */}
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Add New Author
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(initialAuthor).map((key) => (
            <Grid item md={4} key={key}>
              <TextField
                fullWidth
                label={key}
                variant="outlined"
                value={newAuthor[key]}
                onChange={(e) =>
                  setNewAuthor((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAuthorPost}
          style={{ marginTop: "20px" }}
        >
          Add Author
        </Button>
      </Paper>

      {/* UPDATE AUTHOR FORM */}
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Update Author
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(initialAuthor).map((key) => (
            <Grid item md={4} key={key}>
              <TextField
                fullWidth
                label={key}
                variant="outlined"
                value={updateAuthor[key]}
                onChange={(e) =>
                  setUpdateAuthor((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleAuthorUpdate}
          style={{ marginTop: "20px" }}
        >
          Update Author
        </Button>
      </Paper>

      {/* AUTHOR LIST TABLE */}
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Authors List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Birthdate</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell align="center">{author.name}</TableCell>
                  <TableCell align="center">{author.birthDate}</TableCell>
                  <TableCell align="center">{author.country}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleUpdateForm(author)}>
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton onClick={() => handleAuthorDelete(author.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Author;
