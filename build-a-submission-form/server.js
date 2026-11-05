import express from 'express';
import apiRouter from './routes/api.routes.js';
import { notFoundHandler, finalErrorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mount apiRouter
app.use('/api', apiRouter);

// Lesson 20: Mount error handlers AFTER apiRouter (notFoundHandler first, then finalErrorHandler)
app.use(notFoundHandler);
app.use(finalErrorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});