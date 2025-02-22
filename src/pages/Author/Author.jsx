import React, { useEffect, useState } from "react";
import { Typography, Button, Grid, Paper, TextField } from "@mui/material";
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
        const res = await axios.get("http://localhost:8080/api/v1/authors");
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
      const res = await axios.post(
        "http://localhost:8080/api/v1/authors",
        newAuthor
      );
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
      await axios.delete(`http://localhost:8080/api/v1/authors/${id}`);
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
        `http://localhost:8080/api/v1/authors/${updateAuthor.id}`,
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
    <div className="author-container">
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Author Management
      </Typography>

      {/* NEW AUTHOR FORM */}
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Add New Author
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(initialAuthor).map((key, index) => (
            <Grid item xs={12} sm={6} key={key}>
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
          {Object.keys(initialAuthor).map((key, index) => (
            <Grid item xs={12} sm={6} key={key}>
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

      {/* AUTHOR LIST */}
      <div className="author-list">
        {authors.map((author) => (
          <Paper elevation={2} key={author.id} style={{ marginBottom: "10px" }}>
            <div className="author-card">
              <Typography variant="h6">{author.name}</Typography>
              <Typography variant="body2">
                Birthdate: {author.birthDate}
              </Typography>
              <Typography variant="body2">Country: {author.country}</Typography>
              <div className="author-actions">
                <ArrowUpwardIcon
                  onClick={() => handleUpdateForm(author)}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                />
                <DeleteIcon
                  onClick={() => handleAuthorDelete(author.id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default Author;
