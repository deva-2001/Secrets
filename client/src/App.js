import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Secret from "./components/Secret";
import Form from "./components/Form";
import Register from "./components/Register";
import About from "./components/About";
import Contact from "./components/Contact";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import Logout from "./components/Logout";
import Protected from "./components/Protected";
import Google from "./components/Google";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-in" element={<Login />} />
          <Route
            exact
            path="/secret-page"
            element={<Protected Component={Secret} />}
          />
          <Route exact path="/secret-form" element={<Protected Component={Form} />} />
          <Route exact path="/google-login/query" element={<Google />} />
          <Route exact path="/sign-up" element={<Register />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
