import express from 'express';
import apiRouter from './api';

const app = express();
const port = 8080;

app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
