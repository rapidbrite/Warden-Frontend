const config = {
  URL: process.env.REACT_APP_FRONTEND_URL || "http://localhost:3002",
  Backend: process.env.REACT_APP_BACKEND_URL || "http://localhost:3333",
};
// Temporary debugging code - remove after confirming
console.log("Backend URL:", config.Backend);
export default config;

  