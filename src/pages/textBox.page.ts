import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { TextBoxFormData } from '../types/textBox.types';

/**
 * demoqa.com/text-box — the form and output section share duplicate IDs
 * (#currentAddress, #permanentAddress exist as both <textarea> and <p>).
 * Selectors are disambiguated by element tag (textarea#...) or by scoping
 * under the #output container.
 */
export class TextBoxPage extends BasePage {
    private static readonly URL = `${process.env.UI_BASE_URL}/text-box`;

    // Form inputs
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly currentAddressInput: Locator;
    readonly permanentAddressInput: Locator;
    readonly submitButton: Locator;

    // Output — scoped under #output to avoid duplicate-ID conflicts
    private readonly outputSection: Locator;
    readonly outputName: Locator;
    readonly outputEmail: Locator;
    readonly outputCurrentAddress: Locator;
    readonly outputPermanentAddress: Locator;

    constructor(page: Page) {
        super(page);

        this.fullNameInput = page.getByPlaceholder('Full Name');
        this.emailInput = page.getByPlaceholder('name@example.com');
        this.currentAddressInput = page.getByPlaceholder('Current Address');
        this.permanentAddressInput = page.locator('textarea#permanentAddress');
        this.submitButton = page.getByRole('button', { name: 'Submit' });

        this.outputSection = page.locator('#output');
        this.outputName = this.outputSection.locator('#name');
        this.outputEmail = this.outputSection.locator('#email');
        this.outputCurrentAddress = this.outputSection.locator('#currentAddress');
        this.outputPermanentAddress = this.outputSection.locator('#permanentAddress');
    }

    async goto(): Promise<void> {
        await this.navigate(TextBoxPage.URL);
    }

    async fillForm(data: TextBoxFormData): Promise<void> {
        await this.fullNameInput.scrollIntoViewIfNeeded();
        await this.fullNameInput.fill(data.fullName);
        await this.emailInput.scrollIntoViewIfNeeded();
        await this.emailInput.fill(data.email);
        await this.currentAddressInput.scrollIntoViewIfNeeded();
        await this.currentAddressInput.fill(data.currentAddress);
        await this.permanentAddressInput.scrollIntoViewIfNeeded();
        await this.permanentAddressInput.fill(data.permanentAddress);
    }

    async submit(): Promise<void> {
        await this.submitButton.click();
    }
}
