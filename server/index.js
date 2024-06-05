//import path from 'path'
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

// path added 
const path = require('path');
//const __dirname = path.resolve();

const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

// Serve static assets if in production
app.use(express.static(path.join(__dirname, '/client/dist')));//here can be build if using create react

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

/* MONGOOSE SETUP */
const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Dream_Nest",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
  
