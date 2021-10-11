import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
