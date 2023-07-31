import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/NavBar/Header";

export const AuthenticateLayout = () => {
  return (
    <div className="h-screen w-screen dark:bg-gray-600 flex">
       <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};
