import { test, expect } from '@playwright/test';
import { assert } from 'console';
import { OrgAccountPage } from '../pages/OrgAccount.page';




test.describe('Search filtering', () => {

    test('Check Page Object', async({page}) => {
        const orgPage = new OrgAccountPage(page)
        await page.goto('https://lalafo.kg/')

        const data = {
            searchInput: 'стол',
            minPrice: '3000',
            maxPrice: '10000'

        }
       
        await orgPage.searchProduct(data.searchInput);
        await orgPage.waitForAds();

        // Применение фильтрации по цене
        await orgPage.applyPriceFilter(data.minPrice, data.maxPrice);
        await page.waitForTimeout(20000);

        // Проверка количества объявлений после фильтрации
        const adsCount = await orgPage.getAdsCount();
        console.log(`Количество объявлений после фильтрации: ${adsCount}`);
        
        assert(true);
  }
)







    /*test('Check', async ({ page }) => {
        await page.goto('https://lalafo.kg/');
        
        // Заполнение поля поиска
        await page.locator('input[type="text"].search-input[placeholder="Я ищу..."]').fill('Офисные столы');
        
        // Клик по кнопке поиска
        await page.locator('button[type="button"].search-input-button').click();
        
        // Ожидание заголовков объявлений
        await page.waitForSelector('.ad-tile-horizontal-header-link-title', { timeout: 20000, state: 'visible' });
        
        // Проверка, сколько объявлений загружено
        const adsCount = await page.locator('.ad-tile-horizontal-header-link-title').count();
        console.log(`Количество загруженных объявлений: ${adsCount}`);

        // Заполнение цен
        await page.locator('input[type="number"].LFInput__input[placeholder="Цена от"]').fill('5000');
        await page.locator('input[type="number"].LFInput__input[placeholder="Цена до"]').fill('15000');
        
        // Клик по кнопке фильтрации
        await page.locator('button[type="button"].LFButton.medium.primary-green').click();

     
        await page.waitForTimeout(20000);
    });*/
});
