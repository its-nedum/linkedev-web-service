import express, { Express, Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connection from "./connection";
import userRoutes from "./routes/users";

dotenv.config();

const app: Express = express();
const port = process.env.PORT as string ?? 5000;

// connect to mongoDB
connection.connectDatabase();

app.use(helmet());
app.use(cors({
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
  credentials: true,
}));


// parsing the request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set API user routes
app.use("/api/v1", userRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send("Welcome to linked dev API");
});

app.listen(port, () => {
  console.log(`[server]: Server is running on ${port}`);
});
