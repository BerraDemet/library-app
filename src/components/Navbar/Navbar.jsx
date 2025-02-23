import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  Button,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

const pages = [
  { name: "Home", link: "/homepage" },
  { name: "Book", link: "/book" },
  { name: "Publisher", link: "/publisher" },
  { name: "Categories", link: "/categories" },
  { name: "Author", link: "/author" },
  { name: "BorrowingBook", link: "/borrowing_book" },
];

function Navbar() {
  return (
    <div className="navbar">
      <AppBar sx={{ background: "#fff" }} position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                textAlign: "left",
                color: "#000",
                fontSize: "24px",
                letterSpacing: "8px",
              }}
            >
              LIBRARY MANAGEMENT
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      {/* LEFT PANEL */}
      <Box
        sx={{
          width: 240,
          position: "fixed",
          top: "64px",
          left: 0,
          height: "100vh",
          backgroundColor: "#495464",
          paddingTop: "20px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.name}
              sx={{
                color: "white",
                width: "100%",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-selected": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Typography sx={{ textAlign: "left" }}>
                <Link
                  to={page.link}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {page.name}
                </Link>
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Box>

      <Box sx={{ marginLeft: 240, padding: "20px" }}></Box>
    </div>
  );
}

export default Navbar;
