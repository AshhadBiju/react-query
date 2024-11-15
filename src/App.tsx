import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "@/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/http";
// Create a new QueryClient instance

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
