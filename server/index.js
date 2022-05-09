if (process.env.NODE_ENV !== "production") require("dotenv").config();
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
const productsRouter = require("./routes/products");
const checkOutRouter = require("./routes/checkout");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/", checkOutRouter);
app.use("/api/v1/", productsRouter);
app.use("/api/v1/", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}
// app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
