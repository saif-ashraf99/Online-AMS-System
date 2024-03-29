// ==================== INITIALIZE EXPRESS APP ====================
const express = require("express");
const app = express();

// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS

// ====================  Required Module ====================
const auth = require("./routes/Auth");
const auctions = require("./routes/Auctions");
const users = require("./routes/Users");

// ====================  RUN THE APP  ====================
app.listen(4000||process.env.PORT, "localhost", () => {
  console.log("SERVER IS RUNNING ");
});

// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use("/auth", auth);
app.use("/auctions", auctions);
app.use("/users", users);
