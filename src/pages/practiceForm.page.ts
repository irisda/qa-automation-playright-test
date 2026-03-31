import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Gender, Hobby, PracticeFormData } from '../types/practiceForm.types';

export class PracticeFormPage extends BasePage {
    private static readonly URL = `${process.env.UI_BASE_URL}/automation-practice-form`;

    private static readonly GENDER_MAP: Record<Gender, number> = {
        [Gender.Male]: 1,
        [Gender.Female]: 2,
        [Gender.Other]: 3,
    };

    private static readonly HOBBY_MAP: Record<Hobby, number> = {
        [Hobby.Sports]: 1,
        [Hobby.Reading]: 2,
        [Hobby.Music]: 3,
    };

    // Required fields
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly submitButton: Locator;

    // Optional fields
    readonly emailInput: Locator;
    readonly mobileInput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly subjectsInput: Locator;
    readonly currentAddressInput: Locator;
    readonly stateSelect: Locator;
    readonly citySelect: Locator;

    // Success modal
    readonly successModal: Locator;
    readonly successModalTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.mobileInput = page.getByPlaceholder('Mobile Number');
        this.submitButton = page.getByRole('button', { name: 'Submit' });

        this.emailInput = page.getByPlaceholder('name@example.com');
        this.dateOfBirthInput = page.getByPlaceholder('Date of Birth');
        this.subjectsInput = page.getByPlaceholder('Subjects');
        this.currentAddressInput = page.getByPlaceholder('Current Address');
        // React-Select v5 uses generated class names — target by ARIA role instead
        this.stateSelect = page.locator('#state').getByRole('combobox');
        this.citySelect = page.locator('#city').getByRole('combobox');

        this.successModal = page.locator('.modal-content');
        this.successModalTitle = page.locator('#example-modal-sizes-title-lg');
    }

    async goto(): Promise<void> {
        await this.navigate(PracticeFormPage.URL);
    }

    async selectGender(gender: Gender): Promise<void> {
        const index = PracticeFormPage.GENDER_MAP[gender];
        await this.page.locator(`label[for="gender-radio-${index}"]`).click();
    }

    async selectHobby(hobby: Hobby): Promise<void> {
        const index = PracticeFormPage.HOBBY_MAP[hobby];
        await this.page.locator(`label[for="hobbies-checkbox-${index}"]`).click();
    }

    async addSubject(subject: string): Promise<void> {
        await this.subjectsInput.scrollIntoViewIfNeeded();
        await this.subjectsInput.fill(subject);
    }

    private getOption(name: string): Locator {
        return this.page.getByRole('option', { name, exact: true });
    }

    async selectState(stateName: string): Promise<void> {
        await this.stateSelect.scrollIntoViewIfNeeded();
        await this.stateSelect.click();
        await this.getOption(stateName).click();
    }

    async selectCity(cityName: string): Promise<void> {
        await this.citySelect.scrollIntoViewIfNeeded();
        await this.citySelect.click();
        await this.getOption(cityName).click();
    }

    async fillPracticeForm(data: PracticeFormData): Promise<void> {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.selectGender(data.gender);

        if (data.email) {
            await this.emailInput.fill(data.email);
        }

        if (data.mobile) {
            await this.mobileInput.fill(data.mobile);
        }

        if (data.dateOfBirth) {
            // fill() sets the raw value; Escape closes the date-picker popup
            await this.dateOfBirthInput.fill(data.dateOfBirth);
            await this.page.keyboard.press('Escape');
        }
    

        if (data.subjects) {
            for (const subject of data.subjects) {
                await this.addSubject(subject);
            }
        }

        if (data.hobbies) {
            for (const hobby of data.hobbies) {
                await this.selectHobby(hobby);
            }
        }

        if (data.currentAddress) {
            await this.currentAddressInput.fill(data.currentAddress);
        }

        if (data.state) {
            await this.selectState(data.state);
        }

        if (data.city) {
            await this.selectCity(data.city);
        }
    }

    async submit(): Promise<void> {
        await this.submitButton.click();
    }
}
