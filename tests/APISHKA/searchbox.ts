// Import necessary modules from Playwright
import { test, expect } from '@playwright/test';

// Test description for checking search and filters on Ozon
test('Ozon Search and Filter Test', async ({ request }) => {
  // Base URL of the API where the request will be sent
  const BASE_URL = 'https://www.ozon.ru/api/composer-api.bx/_action/search';

  // Declaration of query parameters that will be passed via URL
  const params = {
    'text': 'ноутбук', // Search query
    'page': '1', // Page number
    'sorting': 'rating', // Sorting by rating
    'price[from]': '30000', // Minimum price
    'price[to]': '70000', // Maximum price
  };

  // Declaration of HTTP request headers
  const headers = {
    'accept': 'application/json, text/plain, */*', // Acceptable response formats
    'content-type': 'application/json', // Content type of the request
    'device-type': 'desktop', // Device type
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', // Browser user-agent
  };

  // Sending a GET request to the API with the specified parameters and headers
  const response = await request.get(BASE_URL, { params, headers });

  // Log the response body in a formatted JSON structure for easier reading
  console.log('Response body:', JSON.stringify(await response.json(), null, 2));

  // Check if the request was successful (HTTP status in the 200–299 range)
  expect(response.ok()).toBeTruthy();

  // Check if the response status code is 200 (success)
  expect(response.status()).toBe(200);

  // Convert the response body to JSON for further checks
  const responseBody = await response.json();

  // Check if the response contains an array of items
  expect(Array.isArray(responseBody.products)).toBe(true);

  // Check if the array of items is not empty
  expect(responseBody.products.length).toBeGreaterThan(0);

  // Check if the price of each item is within the specified range
  responseBody.products.forEach(product => {
    expect(product.price.value).toBeGreaterThanOrEqual(30000); // Price should be greater than or equal to the minimum
    expect(product.price.value).toBeLessThanOrEqual(70000); // Price should be less than or equal to the maximum
  });

  // Check if each product has the required fields
  responseBody.products.forEach(product => {
    expect(product).toHaveProperty('name'); // Product should have a name
    expect(product).toHaveProperty('price'); // Product should have a price
    expect(product).toHaveProperty('id'); // Product should have an ID
  });
});
