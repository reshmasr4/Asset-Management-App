import React, { useEffect, useState } from 'react';
import { fetchAssets, deleteAsset, updateAsset } from '../services/assetService';
import AssetForm from './AssetForm';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

interface asset {
  id: string;
  name: string;
  price: number;
  currency: string;
}

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<asset[]>([]);
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState<string>('');
  const [updatedPrice, setUpdatedPrice] = useState<number | ''>('');

  useEffect(() => {
    fetchAssets().then((response) => setAssets(response.data));
  }, []);

  const handleDelete = (id: string) => {
    deleteAsset(id).then(() => {
      setAssets((prev) => prev.filter((asset) => asset.id !== id));
    });
  };

  const handleEdit = (id: string) => {
    if (updatedName.trim() === '' || updatedPrice === '') {
      alert('Please provide valid name and price.');
      return;
    }

    updateAsset(id, {
      name: updatedName,
      price: Number(updatedPrice),
    })
      .then((response) => {
        setAssets((prev) =>
          prev.map((asset) => (asset.id === id ? response.data : asset))
        );
        setEditingAssetId(null);
      })
      .catch((error) => {
        console.error('Error updating asset:', error.message);
      });
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.price, 0);

  const handleAssetAdded = (newAsset: asset) => {
    setAssets((prev) => [...prev, newAsset]);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar variant="dense" sx={{ justifyContent: 'center' }}>
          <Typography variant="h6" color="inherit" component="div">
            Asset Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <AssetForm onAssetAdded={handleAssetAdded} />

      <Box sx={{ marginY: 4 }}>
        <Grid container spacing={2}>
          {assets.map((asset) => (
            <Grid key={asset.id}>
              <Card variant="outlined">
                <CardContent>
                  {editingAssetId === asset.id ? (
                    <>
                      <TextField
                        label="New Name"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        fullWidth
                        margin="dense"
                      />
                      <TextField
                        label="New Price"
                        type="number"
                        value={updatedPrice}
                        onChange={(e) =>
                          setUpdatedPrice(
                            e.target.value === '' ? '' : Number(e.target.value)
                          )
                        }
                        fullWidth
                        margin="dense"
                      />
                      <Box sx={{ marginTop: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(asset.id)}
                          sx={{ marginRight: 1 }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => setEditingAssetId(null)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">{asset.name}</Typography>
                      <Typography color="textSecondary">
                        Price: {asset.currency} {asset.price}
                      </Typography>
                      <Box sx={{ marginTop: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setEditingAssetId(asset.id);
                            setUpdatedName(asset.name);
                            setUpdatedPrice(asset.price);
                          }}
                          sx={{ marginRight: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(asset.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Typography variant="h6">
        Total Value: {assets[0]?.currency || '€'} {totalValue.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default AssetList;
