import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Asset Manager UI Tests', () => {
  test('should display asset list', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check that the Asset Manager title is visible
    const title = await page.locator('text=Asset Manager');
    await expect(title).toBeVisible();
  });

  test('should add, edit and delete a new asset', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    // Add a new asset
    await page.getByRole('button', { name: 'Add New Asset' }).click();
    await page.getByLabel('Asset Name').fill('Car');
    await page.getByLabel('Price').fill('20000');
    await page.getByRole('button', { name: 'Add Asset' }).click();
  
    const newAsset = page.locator('text=Car');
    await expect(newAsset).toBeVisible();
  
    // Edit a new asset
    await page.locator('button:near(:text("Price: € 20000")):has-text("Edit")').click();
  
    await page.getByLabel('New Name').fill('Updated Car');
    await page.getByLabel('New Price').fill('25000');
  
    await page.getByRole('button', { name: 'Save' }).click();
  
    const updatedAsset = page.locator('text=Updated Car');
    await expect(updatedAsset).toBeVisible();

  // Delete updated asset
    await page.locator('button:near(:text("Price: € 25000")):has-text("Delete")').click();

     // Verify the asset is no longer visible
     const deletedAsset = page.locator('text=Updated Car');
     await expect(deletedAsset).not.toBeVisible();
  });
  
});
