import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDatabase } from './database/mongodb';
import { PORT } from './config';
import cors from "cors";
import path from 'path';

dotenv.config();
console.log(process.env.PORT);
import authRoutes from "./routes/auth.route";
import adminRoutes from './routes/admin/admin.route';
const app: Application = express();

let corsOptions = {
    origin: ["http://localhost:3000","http://localhost:3003"],
    optionsSuccessStatus: 200,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, '../uploads'))); //static file serving
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/admin/users',adminRoutes)
app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ success: "true", message: "Welcome to the API" });
});

async function startServer() {
    await connectDatabase();

    app.listen(
        PORT,
        () => {
            console.log(`Server: http://localhost:${PORT}`);
        }
    );
}

startServer().catch((error)=> console.log(error));