/* eslint-disable no-undef */
import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import router from './Routes/Route.js';

const app = express();

// Load environment variables from .env file
env.config();

// Swagger documentation setup
const swaggerDocument = yaml.load('./swagger.yaml');
app.use('/api-tasks', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Express middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB' + err);
  });

// Routes
app.use('/api', router);

// Start the server
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
