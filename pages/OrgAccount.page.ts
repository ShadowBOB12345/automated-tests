import { expect, type Locator, type Page } from '@playwright/test';

export class OrgAccountPage {
    page: Page;
    searchInput: Locator;
    searchButton: Locator;
    adTitles: Locator;
    priceFromInput: Locator;
    priceToInput: Locator;
    filterButton: Locator;

    constructor(page: Page) {
        this.searchInput = page.locator('input[type="text"].search-input[placeholder="Я ищу..."]')
        this.searchButton = page.locator('button[type="button"].search-input-button')
        this.adTitles = page.locator('.ad-tile-horizontal-header-link-title')
        this.priceFromInput = page.locator('input[type="number"].LFInput__input[placeholder="Цена от"]')
        this.priceToInput = page.locator('input[type="number"].LFInput__input[placeholder="Цена до"]')
        this.filterButton = page.locator('button[type="button"].LFButton.medium.primary-green')
    }
    async searchProduct(productName: string) {
        await this.searchInput.fill(productName)
        await this.searchButton.click()

    }
    async waitForAds() {
        await this.adTitles.first().waitFor({ timeout: 20000, state: 'visible' });
    }
    async getAdsCount() {
        const visibleAds = await this.adTitles.filter({ hasText: '' }).count();
        return visibleAds;
    }
    
    async applyPriceFilter(minPrice: string, maxPrice: string) {
        await this.priceFromInput.fill(minPrice);
        await this.priceToInput.fill(maxPrice);
        await this.filterButton.click();
    }
    
}
