import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import assetRoutes from './routes/assets';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/assets', assetRoutes);
console.log('Starting server...');

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
