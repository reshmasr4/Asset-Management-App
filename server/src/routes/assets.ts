import { Router } from 'express';
import { asset } from '../models/asset';

const router = Router();

let assets: asset[] = [];

// Default data for testing
assets = [
  { id: '1', name: 'House', price: 500000, currency: '€' },
  { id: '2', name: 'Painting', price: 3000, currency: '€' },
];

// Get all assets
router.get('/', (_req, res) => {
  res.json(assets);
});

// Create a new asset
router.post('/', (req, res) => {
  console.log('Request received at /assets:', req.body);
  const { name, price } = req.body;

  if (!name || price === undefined || price < 0 || typeof price !== 'number') {
    res.status(400).json({
      error: 'Invalid asset data. Name and a positive numeric Price are required.',
    });
    return;
  }

  const newAsset: asset = { id: `${Date.now()}`, name, price, currency: '€' };
  assets.push(newAsset);
  res.status(201).json(newAsset);
});

// Update an existing asset
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const asset = assets.find((p) => p.id === id);

  if (!asset) {
    res.status(404).json({ error: 'Asset not found' });
    return;
  }

  if (name !== undefined) asset.name = name;

  if (price !== undefined) {
    if (typeof price !== 'number' || price < 0) {
      res.status(400).json({ error: 'Price must be a positive numeric value.' });
      return;
    }
    asset.price = price;
  }

  asset.currency = '€';
  res.json(asset);
});

// Delete an asset
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  assets = assets.filter((p) => p.id !== id);
  res.status(204).send();
});

// Calculate total value of all assets grouped by currency
const calculateTotalValue = () => {
  const groupedValues = assets.reduce((acc, asset) => {
    acc[asset.currency] = (acc[asset.currency] || 0) + asset.price;
    return acc;
  }, {} as Record<string, number>);

  return groupedValues;
};

router.get('/total', (_req, res) => {
  res.json({ totalValue: calculateTotalValue() });
});

export default router;
