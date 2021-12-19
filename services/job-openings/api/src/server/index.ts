import express, { Express } from 'express';
import env from 'dotenv';
import cors from 'cors';
import Routes from '../routes';

// Here we define config for the server and relevant express middleware
const router: Express = express();
env.config();
const PORT = (process.env.PORT || 3800) as number;
const HOST = process.env.HOST || 'localhost';
router.use(
  cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
  }),
);
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.listen(PORT, HOST, () => {
  console.log(`Server listening in on port ${PORT} @ http://${HOST}:${PORT}`);
  Routes(router);
});
