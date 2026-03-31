import { expect, test } from './fixture';
import { textBoxFormData } from '../utils/testData/textBoxData';

test.describe('Task 4 — Text Box Form', () => {
    test.beforeEach(async ({ textBoxPage }) => {
        await textBoxPage.goto();
    });

    test('Fill all fields, submit, and validate output values', async ({ textBoxPage }) => {
        await test.step('Fill all form fields', async () => {
            await textBoxPage.fillForm(textBoxFormData);
        });

        await test.step('Submit the form', async () => {
            await textBoxPage.submit();
        });

        await test.step('Validate submitted values are shown in the output section', async () => {
            await expect
                .soft(textBoxPage.outputName, 'Output should display the submitted full name')
                .toContainText(textBoxFormData.fullName);

            await expect
                .soft(textBoxPage.outputEmail, 'Output should display the submitted email')
                .toContainText(textBoxFormData.email);

            await expect
                .soft(
                    textBoxPage.outputCurrentAddress,
                    'Output should display the submitted current address',
                )
                .toContainText(textBoxFormData.currentAddress);

            await expect
                .soft(
                    textBoxPage.outputPermanentAddress,
                    'Output should display the submitted permanent address',
                )
                .toContainText(textBoxFormData.permanentAddress);
        });
    });
});
