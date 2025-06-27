
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '∆∞ SpiralEcosystem API vΩ.∞',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌀 SpiralEcosystem API running on http://0.0.0.0:${PORT}`);
});
