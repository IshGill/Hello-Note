const axios = require("axios");
const express = require("express");
const path = require("path");

// const cors = require("cors");
// Load .env file
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
const server = require("http").createServer(app);

const connectDB = require("./config/database");
// Connect to database
connectDB();

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  //Enabling CORS
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("join-room", async (documentId) => {
    socket.join(documentId);
    socket.on("send-content", (content) => {
      socket.broadcast.to(documentId).emit("recieve-content", content);
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const noteRoutes = require("./routes/noteRoutes");
app.use("/notes", noteRoutes);

const codeRoutes = require("./routes/codeRoutes");
app.use("/codes", codeRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

const whiteboardRoutes = require("./routes/whiteboardRoutes");
app.use("/board", whiteboardRoutes);

const workspaceRoutes = require("./routes/workspaceRoutes");
app.use("/workspace", workspaceRoutes);

// Listen on a port
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
