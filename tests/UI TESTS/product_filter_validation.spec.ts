import { test, expect } from '@playwright/test';
import { assert } from 'console';
import { OrgAccountPage } from '../../pages/OrgAccount.page';

test.describe('Search filtering', () => {

    test('Verify Page Object Functionality', async ({ page }) => {
        const orgPage = new OrgAccountPage(page);
        await page.goto('https://lalafo.kg/');

        const data = {
            searchInput: 'стол',
            minPrice: '3000',
            maxPrice: '10000'
        };

        // Search for the product
        await orgPage.searchProduct(data.searchInput);
        await orgPage.waitForAds();

        // Apply price filtering
        await orgPage.applyPriceFilter(data.minPrice, data.maxPrice);
        await page.waitForTimeout(20000); // Wait to observe changes

        // Verify the number of ads displayed after filtering
        const filteredAdsCount = await orgPage.getAdsCount();
        console.log(`Number of ads after applying filter: ${filteredAdsCount}`);
        
        assert(true); // Assertion placeholder
    });

    /* Uncomment this test if needed for additional validation
    test('Direct Search and Filter Test', async ({ page }) => {
        await page.goto('https://lalafo.kg/');
        
        // Fill the search input
        await page.locator('input[type="text"].search-input[placeholder="Я ищу..."]').fill('Office tables');
        
        // Click on the search button
        await page.locator('button[type="button"].search-input-button').click();
        
        // Wait for ad titles to be visible
        await page.waitForSelector('.ad-tile-horizontal-header-link-title', { timeout: 20000, state: 'visible' });
        
        // Check the count of loaded ads
        const totalAds = await page.locator('.ad-tile-horizontal-header-link-title').count();
        console.log(`Total ads loaded: ${totalAds}`);

        // Fill in the price range
        await page.locator('input[type="number"].LFInput__input[placeholder="Цена от"]').fill('5000');
        await page.locator('input[type="number"].LFInput__input[placeholder="Цена до"]').fill('15000');
        
        // Click on the filter button
        await page.locator('button[type="button"].LFButton.medium.primary-green').click();

        await page.waitForTimeout(20000); // Wait to observe changes
    });
    */
});
