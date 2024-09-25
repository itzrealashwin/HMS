// const express = require("express");
// const app = express();

// connectMongoDb("mongodb://127.0.0.1:27017/Temp").then(() => console.log("mondo db connected."));

// // app.use(express.urlencoded({extended: false}));

// // app.use("/api/users", userRouter);

// app.listen(PORT, () => {
//     console.log(`server started at PORT: ${PORT}`);
// })

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
// Connect to MongoDB
connectDB(process.env.MONGO_URI).then(() => console.log("MongoDB connected."));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
