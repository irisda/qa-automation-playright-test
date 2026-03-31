import { expect, test } from './fixture';
import { practiceFormData } from '../utils/testData/practiceFormData';

const ERROR_BORDER = 'rgb(220, 53, 69)';

test.describe('Task 5 — Practice Form', () => {
    test.beforeEach(async ({ practiceFormPage }) => {
        await practiceFormPage.goto();
    });

    test('Positive: submit valid data and verify success modal', async ({ practiceFormPage }) => {
        await test.step('Fill form with valid data', async () => {
            await practiceFormPage.fillPracticeForm(practiceFormData);
        });

        await test.step('Submit the form', async () => {
            await practiceFormPage.submit();
        });

        await test.step('Verify success modal appears with the correct title', async () => {
            await expect
                .soft(
                    practiceFormPage.successModalTitle,
                    'Success modal should appear after a valid submission',
                )
                .toHaveText('Thanks for submitting the form');
        });
    });

    test('Negative: submit empty form and verify required fields show errors', async ({
        practiceFormPage,
    }) => {
        await test.step('Click Submit without filling any required field', async () => {
            await practiceFormPage.submit();
        });

        await test.step('Verify success modal does NOT appear', async () => {
            await expect
                .soft(
                    practiceFormPage.successModal,
                    'Success modal must not appear when required fields are empty',
                )
                .not.toBeVisible();
        });

        await test.step('Verify all required inputs are highlighted with an error border', async () => {
            await expect
                .soft(practiceFormPage.firstNameInput, 'First name should show error border')
                .toHaveCSS('border-color', ERROR_BORDER);

            await expect
                .soft(practiceFormPage.lastNameInput, 'Last name should show error border')
                .toHaveCSS('border-color', ERROR_BORDER);

            await expect
                .soft(practiceFormPage.mobileInput, 'Mobile number should show error border')
                .toHaveCSS('border-color', ERROR_BORDER);
        });
    });

    test('Only First Name filled → remaining required fields show errors', async ({
        practiceFormPage,
    }) => {
        await test.step('Fill only First Name', async () => {
            await practiceFormPage.firstNameInput.fill('John');
        });

        await test.step('Submit the form', async () => {
            await practiceFormPage.submit();
        });

        await test.step('Verify First Name has no error border', async () => {
            await expect
                .soft(practiceFormPage.firstNameInput, 'First name should NOT show error border')
                .not.toHaveCSS('border-color', ERROR_BORDER);
        });

        await test.step('Verify Last Name and Mobile still show errors', async () => {
            await expect
                .soft(practiceFormPage.lastNameInput, 'Last name should show error border')
                .toHaveCSS('border-color', ERROR_BORDER);

            await expect
                .soft(practiceFormPage.mobileInput, 'Mobile should show error border')
                .toHaveCSS('border-color', ERROR_BORDER);
        });
    });

    test('Only Last Name filled → remaining required fields show errors', async ({
        practiceFormPage,
    }) => {
        await test.step('Fill only Last Name', async () => {
            await practiceFormPage.lastNameInput.fill('Doe');
        });

        await test.step('Submit the form', async () => {
            await practiceFormPage.submit();
        });

        await test.step('Verify Last Name has no error border', async () => {
            await expect
                .soft(practiceFormPage.lastNameInput, 'Last name should NOT show error border')
                .not.toHaveCSS('border-color', ERROR_BORDER);
        });

        await test.step('Verify First Name and Mobile still show errors', async () => {
            await expect
                .soft(practiceFormPage.firstNameInput, 'First name should show error border')
                .toHaveCSS('border-color', ERROR_BORDER);

            await expect
                .soft(practiceFormPage.mobileInput, 'Mobile should show error border')
                .toHaveCSS('border-color', ERROR_BORDER);
        });
    });

    test('Only Mobile filled → remaining required fields show errors', async ({
        practiceFormPage,
    }) => {
        await test.step('Fill only Mobile', async () => {
            await practiceFormPage.mobileInput.fill('0987654321');
        });

        await test.step('Submit the form', async () => {
            await practiceFormPage.submit();
        });

        await test.step('Verify Mobile has no error border', async () => {
            await expect
                .soft(practiceFormPage.mobileInput, 'Mobile should NOT show error border')
                .not.toHaveCSS('border-color', ERROR_BORDER);
        });

        await test.step('Verify First Name and Last Name still show errors', async () => {
            await expect
                .soft(practiceFormPage.firstNameInput, 'First name should show error border')
                .toHaveCSS('border-color', ERROR_BORDER);

            await expect
                .soft(practiceFormPage.lastNameInput, 'Last name should show error border')
                .toHaveCSS('border-color', ERROR_BORDER);
        });
    });

});