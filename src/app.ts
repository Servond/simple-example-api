import express, { Application } from "express";
import cors from "cors"
import helmet from "helmet";

import { PORT, FE_URL } from "./config";

import authRouter from "./routers/auth.router";


const port = PORT || 8080;
const app: Application = express();

app.use(helmet());
app.use(cors({
    origin: FE_URL
}));
app.use(express.json());
app.use("/api/auth", authRouter)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;