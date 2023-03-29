import express, { Application, Request, Response } from "express";
import { connectDB, sequelize } from "./connection/database";
import dotenv from "dotenv";

dotenv.config();

const server: Application = express();

const PORT = process.env.PORT;

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Quad-Fold\n Best deals with the best prices",
  });
  console.log("BOOM 🔥🔥");
});

server.listen(PORT, async () => {
  console.log(`Quad server is listening at http://localhost:${PORT}`);
  await connectDB();
  sequelize.sync({ force: false }).then(() => {
    console.log("✅Synced database successfully...");
  });
});

export default server;
