// Import necessary modules from Playwright
import { test, expect } from '@playwright/test';

// Test description for checking search and filters on Lalafo
test('Lalafo Search and Filter Test', async ({ request }) => {
  // Base URL of the API where the request will be sent
  const BASE_URL = 'https://lalafo.kg/api/search/v3/feed/search';
  
  // Declaration of query parameters that will be passed via URL
  const params = {
    'expand': 'url', // Expand data to include product URLs
    'per-page': '20', // Number of items per page
    'category_id': '4327', // Category ID (office furniture)
    'q': 'Офисные столы', // Search query
    'city_id': '103184', // City ID (Bishkek)
    'sort_by': 'default', // Default sorting
    'price[from]': '10000', // Minimum price
    'price[to]': '20000', // Maximum price
    'with_feed_banner': 'true' // Include feed banners
  };

  // Declaration of HTTP request headers
  const headers = {
    'accept': 'application/json, text/plain, */*', // Acceptable response formats
    'country-id': '12', // Country ID
    'device': 'pc', // Device type
    'experiment': 'novalue', // User header for experiments
    'language': 'ru_RU', // Preferred language for the response
    'referer': 'https://lalafo.kg/bishkek/mebel-2/mebel/q-%D0%9E%D1%84%D0%B8%D1%81%D0%BD%D1%8B%D0%B5%20%D1%81%D1%82%D0%BE%D0%BB%D1%8B?sort_by=default&price[from]=10000&price[to]=20000', // Referer URL
    'request-id': 'react-client_7c19e2dc-d514-4857-97d7-51def66d0829', // Unique request ID
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"', // Browser information
    'sec-ch-ua-mobile': '?0', // Device is not mobile
    'sec-ch-ua-platform': '"Windows"', // Operating system platform
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', // Browser user-agent
    'user-hash': '52942bc2-60ed-4bd0-a9e0-2da1b5332443', // Unique user ID
    'x-cache-bypass': 'yes' // Bypass cache
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
  expect(Array.isArray(responseBody.items)).toBe(true);
  
  // Check if the array of items is not empty
  expect(responseBody.items.length).toBeGreaterThan(0);

  // Check if the price of each item is within the specified range
  responseBody.items.forEach(item => {
    expect(item.price).toBeGreaterThanOrEqual(10000); // Price should be greater than or equal to the minimum
    expect(item.price).toBeLessThanOrEqual(20000); // Price should be less than or equal to the maximum
  });

  // Check if each item has the required fields
  responseBody.items.forEach(item => {
    expect(item).toHaveProperty('title'); // Item should have a title
    expect(item).toHaveProperty('price'); // Item should have a price
    expect(item).toHaveProperty('user'); // Item should be associated with a user
    expect(item.user).toHaveProperty('username'); // User should have a username
  });
});
