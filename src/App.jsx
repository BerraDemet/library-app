import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Book from "./pages/Book/Book";
import HomePage from "./pages/HomePage/HomePage";
import Publisher from "./pages/Publisher/Publisher";
import Categories from "./pages/Categories/Categories";
import Author from "./pages/Author/Author";
import Borrowing from "./pages/BorrowingBook/BorrowingBook";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/book">
          <div style={{ marginLeft: "250px" }}>
            <Book />
          </div>
        </Route>
        <Route path="/homepage">
          <div style={{ marginLeft: "250px" }}>
            <HomePage />
          </div>
        </Route>
        <Route path="/publisher">
          <div style={{ marginLeft: "250px" }}>
            <Publisher />
          </div>
        </Route>
        <Route path="/categories">
          <div style={{ marginLeft: "250px" }}>
            <Categories />
          </div>
        </Route>
        <Route path="/author">
          <div style={{ marginLeft: "250px" }}>
            <Author />
          </div>
        </Route>
        <Route path="/borrowing_book">
          <div style={{ marginLeft: "250px" }}>
            <Borrowing />
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
