import React from "react";
import ReactDOM from "react-dom";
import App from "./App";  // Import your App component

// Render your React app into the root div of your popup HTML
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
