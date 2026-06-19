import { useState, useEffect } from "react";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function App() {

  const [isLoggedIn,
    setIsLoggedIn] =
    useState(false);

  useEffect(() => {

    const userId =
      localStorage.getItem(
        "user_id"
      );

    if (userId) {

      setIsLoggedIn(true);

    }

  }, []);

  return isLoggedIn ? (

    <Dashboard />

  ) : (

    <AuthPage
      setIsLoggedIn={
        setIsLoggedIn
      }
    />

  );

}

export default App;