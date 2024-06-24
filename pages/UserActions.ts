import { Page } from '@playwright/test';

export class UserActions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async toLogin(email: string, password: string) {
        await this.page.click('.nav-link:has-text("Sign in")');
        (await this.page.locator('h1.text-xs-center').innerText()).includes('Sign in');
        await this.page.fill('input[placeholder="Email"]', email);
        await this.page.fill('input[placeholder="Password"]', password);
        await this.page.click('button');
    }

    async toIncorrectLogin(email: string, password: string) {
        await this.page.click('.nav-link:has-text("Sign in")');
        (await this.page.locator('h1.text-xs-center').innerText()).includes('Sign in');
        await this.page.fill('input[placeholder="Email"]', email);
        await this.page.fill('input[placeholder="Password"]', password);
        await this.page.click('button');
    }

    async toSignUp(username: string, email: string, password: string) {
        await this.page.fill('input[placeholder="Username"]', username);
        await this.page.fill('input[placeholder="Email"]', email);
        await this.page.fill('input[placeholder="Password"]', password);
        await this.page.click('button');
    }

    async toCreateArticle(title: string, description: string, body: string) {
        await this.page.click('text=New Article');
        await this.page.fill('input[placeholder="Article Title"]', title);
        await this.page.fill('input[placeholder="What\'s this article about?"]', description);
        await this.page.fill('textarea[placeholder="Write your article (in markdown)"]', body);
        await this.page.click('text=Publish Article');
    }

    async editArticle(title: string, description: string, body: string) {
        await this.page.click('text=Edit Article');
        await this.page.fill('input[placeholder="Article Title"]', title);
        await this.page.fill('input[placeholder="What\'s this article about?"]', description);
        await this.page.fill('textarea[placeholder="Write your article (in markdown)"]', body);
        await this.page.click('text=Publish Article');
    }
}
