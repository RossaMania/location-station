import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import { AuthProvider } from "./shared/hooks/auth-hook";

function App() {


  return (
    <AuthProvider>
        <MainNavigation />
        <main>
          <Outlet />
        </main>
    </AuthProvider>
  );
}

export default App;
