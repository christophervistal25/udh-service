import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import bodyParser from "body-parser";
const { PORT } = require("./src/config");
import morgan from "morgan";
const app = express();
// app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.use("/employee", proxy("http://127.0.0.1:3031"));
app.use("/", proxy(`http://127.0.0.1:${PORT}`));

app.listen(PORT, () => console.log(`Gateway is listening to port ${PORT}`));
