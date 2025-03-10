// Import required modules
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const { Pool } = require("pg");
const cors = require("cors"); // Import cors

// Import Routes
const articleRoutes = require("./routes/articleRoutes");
const categorieRoutes = require("./routes/categorieRoutes");
const marqueRoutes = require("./routes/marqueRoutes");
const genreRoutes = require("./routes/genreRoutes");
const tailleRoutes = require("./routes/tailleRoutes");
const couleursRouter = require("./routes/couleurRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const userRoutes = require("./routes/userRoutes");
const remiseRoutes = require("./routes/remiseRoutes");

const app = express();

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Configure session middleware
// Configure session middleware
app.use(
  session({
    store: new pgSession({
      pool: pool, // Use the PostgreSQL connection pool
      tableName: "session", // Name of the table to store sessions
    }),
    secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      sameSite: "lax", // Required for cross-origin requests
    },
  })
);

// Enable CORS with credentials
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only your frontend origin
    credentials: true, // Allow credentials (cookies, etc.)
  })
);
// Parse JSON bodies (replaces bodyParser.json())
app.use(express.json());

// Route Setup
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/marques", marqueRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/tailles", tailleRoutes);
app.use("/api/couleurs", couleursRouter);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/utilisateur", userRoutes);
app.use("/api/remises", remiseRoutes);


const PORT = process.env.PORT || 5000;
const sequelize = require("./config/database");

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced!");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ Error syncing database:", err));