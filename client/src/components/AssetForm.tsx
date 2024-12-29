import React, { useState } from 'react';
import { createAsset } from '../services/assetService';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from '@mui/material';

interface AssetFormProps {
  onAssetAdded: (asset: asset) => void;
}

interface asset {
  id: string;
  name: string;
  price: number;
  currency: '€'; // New property for currency
}

const AssetForm: React.FC<AssetFormProps> = ({ onAssetAdded }) => {
  const [open, setOpen] = useState(false); // Controls modal visibility
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || price === '') {
      alert('Please provide valid name and price.');
      return;
    }

    const newAsset = {
      id: `${Date.now()}`,
      name,
      price: Number(price),
      currency: '€',
    };

    createAsset(newAsset)
      .then((response) => {
        onAssetAdded(response.data);
        setName('');
        setPrice('');
        handleClose(); // Close modal after submission
      })
      .catch((error) => {
        console.error('Error adding asset:', error.message);
      });
  };

  return (
    <>
      {/* Add Asset Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Add New Asset
        </Button>
      </Box>

      {/* Add Asset Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Asset</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 300,
            }}
          >
            <TextField
              label="Asset Name"
              id="assetNameInput"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Add Asset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssetForm;
