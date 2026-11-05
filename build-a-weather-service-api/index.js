import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import weatherRouter from './weather.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware لقراءة البيانات
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lesson 17: Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount the weather router at /api/weather
app.use('/api/weather', weatherRouter);

// Lesson 18: Add GET / route using res.sendFile()
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lesson 3 & 19: Add GET /api/info route with endpoints
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Weather Service API',
    version: '1.0.0',
    description: 'A simple weather service API built with Express',
    endpoints: ['/api/weather/:city', '/api/greet/:name', '/api/data']
  });
});

// Lesson 6: Add GET /docs route that redirects to /api/info
app.get('/docs', (req, res) => {
  res.redirect('/api/info');
});

// Lesson 5: Add GET /api/status route
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'OK'
  });
});

// Lesson 7: Add GET /api/greet/:name route
app.get('/api/greet/:name', (req, res) => {
  const { name } = req.params;
  res.status(200).json({
    greeting: `Hello, ${name}!`
  });
});

// Lesson 8 & 9: Add app.route('/api/data') with GET and POST chained
app.route('/api/data')
  .get((req, res) => {
    res.status(200).json({
      message: 'Here is your data',
      data: [1, 2, 3, 4, 5]
    });
  })
  .post((req, res) => {
    res.status(201).json({
      message: 'Data created successfully',
      receivedData: req.body
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});