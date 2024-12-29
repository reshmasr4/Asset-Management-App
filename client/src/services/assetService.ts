import axios from 'axios';

const API_URL = 'http://localhost:5000/assets';

// Fetch all assets
export const fetchAssets = () => {
  console.log('Fetching assets from:', API_URL);
  return axios.get(API_URL);
};

// Create a new asset
export const createAsset = (asset: { name: string; price: number }) => {
  console.log('Creating asset:', asset);
  return axios.post(API_URL, { ...asset, currency: '€' }, {
    headers: { 'Content-Type': 'application/json' },
  });
};

// Update an existing asset
export const updateAsset = (id: string, asset: { name: string; price: number }) => {
  console.log('Updating asset:', id, asset);
  return axios.patch(`${API_URL}/${id}`, { ...asset, currency: '€' }, {
    headers: { 'Content-Type': 'application/json' },
  });
};

// Delete an asset
export const deleteAsset = (id: string) => {
  console.log('Deleting asset:', id);
  return axios.delete(`${API_URL}/${id}`);
};
