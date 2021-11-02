import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.static('./public'));
app.get('/', (_req, res) => res.sendFile('index.html', { root: './public' }));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
