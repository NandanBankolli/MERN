import React from "react";
import StudentFoam from "./Components/StudentFoam";
import "./App.css";

export default function App() {
  return (
    <div>
      <h1 style={{textAlign:"center", marginTop: "20px"}}>Student Management System</h1>
      <StudentFoam />
    </div>
  );
}