import { Page } from '@playwright/test';

export abstract class BasePage {
    constructor(protected readonly page: Page) {}

    protected async navigate(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    public async clearAllCookies(): Promise<void> {
        await this.page.context().clearCookies();
    }

    public async clearLocalStorage(): Promise<void> {
        await this.page.evaluate(() => {
            localStorage.clear();
        });
    }
}
