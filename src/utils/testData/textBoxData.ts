import { faker } from '@faker-js/faker';
import { TextBoxFormData } from '../../types/textBox.types';

export const textBoxFormData: TextBoxFormData = {
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
};
