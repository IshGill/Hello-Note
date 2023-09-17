import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Document } from "./Pages/Document";
import Whiteboard from "./Pages/Whiteboard";
import Workspace from "./Pages/Workspace";
import CompilerIDE from "./Pages/CompilerIDE";
import { AuthContextProvider } from "./Contexts/AuthContext";

function App() {
  //Checking if noteObj is stored
  // console.log("Global variable searchObj is ", searchObj);
  return (
    <AuthContextProvider>
      <></>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Whiteboard/:id" element={<Whiteboard />} />
          <Route path="/Doc/:id" element={<Document />} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/Codes/:id" element={<CompilerIDE />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
