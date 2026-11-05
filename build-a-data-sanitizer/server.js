import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { inputCleaner, inputValidator } from './middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. User Story 5: GET / redirects to /form (يجب أن يكون في البداية تماماً)
app.get('/', (req, res) => {
  res.redirect('/form');
});

// 2. تقديم الملفات الثابتة
app.use(express.static(path.join(__dirname, 'public')));

// 3. User Story 6: GET /form serves the static HTML form
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. User Story 7: POST /submit
app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  res.json({
    username: req.body.username,
    comment: req.body.comment
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});