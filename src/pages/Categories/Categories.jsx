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
import "./Categories.css";

const initialCategories = {
  name: "",
  description: "",
};

const Categories = () => {
  const [newCategory, setNewCategory] = useState(initialCategories);
  const [Categoris, setCategoris] = useState([]);
  const [updateCategory, setUpdateCategory] = useState(initialCategories);

  useEffect(() => {
    const fetchCategoris = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/categories");
        setCategoris(res.data);
      } catch (error) {
        console.error("Error fetching Categoris:", error);
      }
    };
    fetchCategoris();
  }, [Categoris]);

  const handleCategoryPost = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/categories",
        newCategory
      );
      setCategoris((prevCategoris) => [...prevCategoris, res.data]);
      setNewCategory(initialCategories);
    } catch (error) {
      console.error("Error adding Categori:", error);
    }
  };

  const handleCategoryDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/categories/${id}`);
      setCategoris((prev) => prev.filter((Category) => Category.id !== id));
    } catch (error) {
      console.error("Error deleting Categori:", error);
    }
  };

  const handleUpdateForm = (Category) => {
    setUpdateCategory(Category);
  };

  const handleCategoryUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/categories/${updateCategory.id}`,
        updateCategory
      );

      setCategoris((prev) =>
        prev.map((Category) =>
          Category.id === updateCategory.id ? res.data : Category
        )
      );

      setUpdateCategory(initialCategories);
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  };

  return (
    <div className="categories-container">
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Categories Management
      </Typography>

      {/* NEW CATEGORY */}
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Add New Category
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(initialCategories).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key}
                variant="outlined"
                value={newCategory[key]}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCategoryPost}
          style={{ marginTop: "20px" }}
        >
          Add Category
        </Button>
      </Paper>

      {/* UPDATE CATEGORY */}
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Update Category
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(initialCategories).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key}
                variant="outlined"
                value={updateCategory[key]}
                onChange={(e) =>
                  setUpdateCategory((prev) => ({
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
          onClick={handleCategoryUpdate}
          style={{ marginTop: "20px" }}
        >
          Update Category
        </Button>
      </Paper>

      {/* CATEGORIES LIST */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Categoris?.map((Category, index) => (
              <TableRow
                key={Category.id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <TableCell>{Category.name}</TableCell>
                <TableCell>{Category.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowUpwardIcon />}
                    onClick={() => handleUpdateForm(Category)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleCategoryDelete(Category.id)}
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

export default Categories;
