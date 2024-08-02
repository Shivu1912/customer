import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import About from "./containers/About";
import CustomerList from "./containers/CustomerList";
import CustomerAdd from "./containers/CustomerAdd";
import PageNotFound from "./containers/PageNotFound";
// import CustomerApp from "./containers/CustomerApp";

const App = () => {
  return (
    <Router>
      <div style={{ margin: "10px" }}>
        <h2 style={{ marginBottom: "10px" }}> Customer App</h2>
        <Link to={"/home"}>Home</Link> &nbsp;|&nbsp;
        <Link to={"/about"}>About</Link>&nbsp; | &nbsp;
        <Link to={"/customer/add"}> Customer Add</Link>&nbsp; | &nbsp;
        <Link to={"/customer/list"}>Customer List</Link>&nbsp; | &nbsp;
        <Link to={"/login"}>Logout</Link>&nbsp; | &nbsp;
        <hr />
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate to={{ pathname: "/login" }} />}
          />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/customer/edit/:recordId"
            element={<CustomerAdd />}
          />
          <Route
            exact
            path="/authentication"
            element={<Navigate to={{ pathname: "/home" }} />}
          />
          <Route exact path="/customer/list" element={<CustomerList />} />
          <Route exact path="/customer/add" element={<CustomerAdd />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
