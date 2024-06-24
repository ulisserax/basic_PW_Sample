import { test, expect } from '@playwright/test';
import { UserActions} from '../pages/UserActions';

test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.context().clearPermissions();
    await page.goto('/');
});

test.describe('Create Article', () => {
    test('should allow the user to create an article', async ({ page }) => {
        const userActions = new UserActions(page);

        await userActions.toLogin(process.env.EMAIL as string, process.env.PASSWORD as string);

        await page.click('.nav-link:has-text("New Article")');

        await page.fill('input[placeholder="Article Title"]', 'Test Article');
        await page.fill('input[placeholder="What\'s this article about?"]', 'Test Article');
        await page.fill('textarea[placeholder="Write your article (in markdown)"]', 'Test Article');
        await page.fill('input[placeholder="Enter tags"]', 'Test Article');

        await page.click('button:has-text("Publish Article")');

        const [response] = await Promise.all([
            page.waitForResponse(response => 
                response.url().includes('/api/articles') && response.status() === 200
            ),
            page.click('button:has-text("Publish Article")')
        ]);

        await page.click('.nav-link:has-text("Home")');

        await expect(page.locator('h1')).toHaveText('Test Article');
    });
});
