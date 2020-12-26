import React, { useState } from "react";
import { Route, Router } from "react-router-dom";
import AppRouter from "./Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return;
  <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
