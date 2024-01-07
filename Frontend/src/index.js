import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
// import Login from "./User_authentication/Login";
import { BrowserRouter } from "react-router-dom";
// import Stustate from "./Student_view/context/stustate";
const root=createRoot(document.getElementById('root'));


root.render(<BrowserRouter><App/></BrowserRouter>);
// root.render(<Stustate><Login/></Stustate>);
