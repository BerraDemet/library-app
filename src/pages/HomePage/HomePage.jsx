import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="library-container">
      <div className="container-text">
        <h1>Library Management</h1>
        <p>
          Welcome to the Library Management System, where knowledge meets
          convenience. Our platform allows you to easily manage your library's
          books, authors, categories, and borrowing activities. Whether you're a
          librarian organizing resources or a user looking for your next read,
          our intuitive interface ensures a smooth and efficient experience.
          Start exploring today and take control of your library's future!
        </p>
      </div>
      <div className="container-img">
        <img src="library.png"></img>
      </div>
    </div>
  );
};

export default HomePage;
