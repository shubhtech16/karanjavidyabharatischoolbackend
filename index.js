const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { connectDB } = require("./config/db");

const galleryRoutes = require("./routes/galleryRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const contactRoutes = require("./routes/contactRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const holidayRoutes = require("./routes/holidayRoutes");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Connect to MySQL
connectDB();

const app = express();

// Middleware
app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  }),
);

// Static uploads folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/gallery", galleryRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/holiday", holidayRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("School Project API is running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
