const { test, expect } = require('@playwright/test');

const API_KEY = process.env.API_KEY;

test.describe('OpenWeather API Testing', () => {

    test('Current weather data by latitude and longitude', async ({ request }) => {
        const lat = 35;
        const lon = 139;
        const response = await request.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: lat,
                lon: lon,
                appid: API_KEY,
            },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('weather');
    });

    test('Current weather data by city name', async ({ request }) => {
        const city = "London";
        const response = await request.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: API_KEY,
            },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('main');
        expect(body.main).toHaveProperty('temp');
    });

    test('Current weather with different units of measurement - Metric', async ({ request }) => {
        const city = "London";
        const units = "metric";
        const response = await request.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                units: units,
                appid: API_KEY,
            },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('main');
        expect(body.main).toHaveProperty('temp');
    });

    test('Current weather with different units of measurement - Imperial', async ({ request }) => {
        const city = "London";
        const units = "imperial";
        const response = await request.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                units: units,
                appid: API_KEY,
            },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('main');
        expect(body.main).toHaveProperty('temp');
    });

    test('Bad Request error', async ({ request }) => {
        const response = await request.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: 1000,
                lon: 1000,
                appid: API_KEY,
            },
            failOnStatusCode: false,
        });
        expect(response.status()).toBe(400);
    });

    test('Unauthorized error', async ({ request }) => {
        const response = await request.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: 25,
                lon: 49,
                appid: '5c82f893684f564db65dsfsad9083',
            },
            failOnStatusCode: false,
        });
        expect(response.status()).toBe(401);
    });

    test('Not Found error', async ({ request }) => {
        const response = await request.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: 'nonexistentcity',
                appid: API_KEY,
            },
            failOnStatusCode: false,
        });
        expect(response.status()).toBe(404);
    });

    test('Internal Server Error (Simulated)', async ({ request, page }) => {
        await page.route('**/weather**', route => {
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Internal Server Error' }),
            });
        });

        const response = await request.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: 'London',
                appid: API_KEY,
            },
            failOnStatusCode: false,
        });
        expect(response.status()).toBe(500);
    });

});