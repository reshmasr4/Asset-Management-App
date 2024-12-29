import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import assetRoutes from './routes/assets';

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' })); 


app.use('/assets', assetRoutes);

export default app;
