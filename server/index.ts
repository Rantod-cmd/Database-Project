import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongo';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

dotenv.config();
const app = express();
const PORT = 5207;
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Import Routes
import provinceRoutes from './routes/provinceRoutes'
import authRoutes from './routes/authRoutes'
app.use('/api/provinces', provinceRoutes)
app.use('/api/auth',authRoutes)

app.listen(PORT, async () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
  await connectMongoDB()
});