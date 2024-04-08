//index.js
const express = require("express");
const app = express();
const port = 3000;

// Middleware to enable Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
app.use(
  cors({
    origin: "*", // Change this to your specific frontend origin if needed
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

const session = require("express-session");

// Use express session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true if using HTTPS
  })
);

// other configurations and routes...

// Middleware to parse JSON request bodies
app.use(express.json());

// Importing routers
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Mounting routers
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
