import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Gender, Hobby, PracticeFormData } from '../types/practiceForm.types';

export class PracticeFormPage extends BasePage {
    private static readonly URL = 'https://demoqa.com/automation-practice-form';

    private static readonly GENDER_MAP: Record<Gender, number> = {
        Male: 1,
        Female: 2,
        Other: 3,
    };

    private static readonly HOBBY_MAP: Record<Hobby, number> = {
        Sports: 1,
        Reading: 2,
        Music: 3,
    };

    // Required fields
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly mobileInput: Locator;
    readonly submitButton: Locator;

    // Optional fields
    readonly emailInput: Locator;
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

        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.mobileInput = page.locator('#userNumber');
        this.submitButton = page.locator('#submit');

        this.emailInput = page.locator('#userEmail');
        this.dateOfBirthInput = page.locator('#dateOfBirthInput');
        this.subjectsInput = page.locator('#subjectsInput');
        this.currentAddressInput = page.locator('#currentAddress');
        // React-Select — click the control div, options render in a portal
        this.stateSelect = page.locator('#state .react-select__control');
        this.citySelect = page.locator('#city .react-select__control');

        this.successModal = page.locator('.modal-content');
        this.successModalTitle = page.locator('.modal-title');
    }

    async goto(): Promise<void> {
        await this.navigate(PracticeFormPage.URL);
    }

    async selectGender(gender: Gender): Promise<void> {
        const index = PracticeFormPage.GENDER_MAP[gender];
        // Actual radio inputs are hidden; click the visible label instead
        await this.page.locator(`label[for="gender-radio-${index}"]`).click();
    }

    async selectHobby(hobby: Hobby): Promise<void> {
        const index = PracticeFormPage.HOBBY_MAP[hobby];
        await this.page.locator(`label[for="hobbies-checkbox-${index}"]`).click();
    }

    async addSubject(subject: string): Promise<void> {
        await this.subjectsInput.fill(subject);
        await this.page
            .locator('.subjects-auto-complete__option')
            .filter({ hasText: subject })
            .first()
            .click();
    }

    async selectState(stateName: string): Promise<void> {
        await this.stateSelect.click();
        await this.page
            .locator('.react-select__menu-list .react-select__option')
            .filter({ hasText: stateName })
            .click();
    }

    async selectCity(cityName: string): Promise<void> {
        await this.citySelect.click();
        await this.page
            .locator('.react-select__menu-list .react-select__option')
            .filter({ hasText: cityName })
            .click();
    }

    async fillForm(data: PracticeFormData): Promise<void> {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);

        if (data.email) {
            await this.emailInput.fill(data.email);
        }

        await this.selectGender(data.gender);
        await this.mobileInput.fill(data.mobile);

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
