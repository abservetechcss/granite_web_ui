import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    Main,
    Login
} from "./asyncpages";

const Routers = () => ( 
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Main />} />
    </Routes>
);

export default Routers;
