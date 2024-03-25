import React from "react";
import HeaderComponent from "../component/Header/Header";

export default function Layout({ children }) {
  return (
    <div>
      <HeaderComponent />
      <div>{children}</div>
    </div>
  );
}
