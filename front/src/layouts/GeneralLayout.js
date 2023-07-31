import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const GeneralLayout = () => {
  return (
    <>
     
      <Outlet></Outlet>
    </>
  );
};
