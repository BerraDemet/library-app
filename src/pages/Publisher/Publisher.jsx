import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Publisher.css";

const initialPublisher = {
  name: "",
  establishmentYear: "",
  address: "",
};

const Publisher = () => {
  const [newPublisher, setNewPublisher] = useState(initialPublisher);
  const [publishers, setPublishers] = useState([]);
  const [updatePublisher, setUpdatePublisher] = useState(initialPublisher);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/publishers");
        setPublishers(res.data);
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    };
    fetchPublishers();
  }, []);

  const handlePublisherPost = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/publishers",
        newPublisher
      );
      setPublishers((prevPublishers) => [...prevPublishers, res.data]);
      setNewPublisher(initialPublisher);
    } catch (error) {
      console.error("Error adding publisher:", error);
    }
  };

  const handlePublisherDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/publishers/${id}`);
      setPublishers((prev) => prev.filter((publisher) => publisher.id !== id));
    } catch (error) {
      console.error("Error deleting publisher:", error);
    }
  };

  const handleUpdateForm = (publisher) => {
    setUpdatePublisher(publisher);
  };

  const handlePublisherUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/publishers/${updatePublisher.id}`,
        updatePublisher
      );

      setPublishers((prev) =>
        prev.map((publisher) =>
          publisher.id === updatePublisher.id ? updatePublisher : publisher
        )
      );

      setUpdatePublisher(initialPublisher);
    } catch (error) {
      console.error("Error updating publisher:", error);
    }
  };

  return (
    <div className="publishers-container">
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Publishers Management
      </Typography>

      {/* NEW PUBLISHER */}
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Add New Publisher
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(initialPublisher).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key}
                variant="outlined"
                value={newPublisher[key]}
                onChange={(e) =>
                  setNewPublisher((prev) => ({
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
          color="primary"
          fullWidth
          onClick={handlePublisherPost}
          style={{ marginTop: "20px" }}
        >
          Add Publisher
        </Button>
      </Paper>

      {/* UPDATE PUBLISHER */}
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Update Publisher
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(initialPublisher).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key}
                variant="outlined"
                value={updatePublisher[key]}
                onChange={(e) =>
                  setUpdatePublisher((prev) => ({
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
          onClick={handlePublisherUpdate}
          style={{ marginTop: "20px" }}
        >
          Update Publisher
        </Button>
      </Paper>

      {/* PUBLISHERS LIST */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Publisher Name</TableCell>
              <TableCell>Establishment Year</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publishers?.map((publisher, index) => (
              <TableRow
                key={publisher.id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <TableCell>{publisher.name}</TableCell>
                <TableCell>{publisher.establishmentYear}</TableCell>
                <TableCell>{publisher.address}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowUpwardIcon />}
                    onClick={() => handleUpdateForm(publisher)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handlePublisherDelete(publisher.id)}
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

export default Publisher;
