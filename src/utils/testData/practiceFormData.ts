import { faker } from '@faker-js/faker';
import { Gender, Hobby, PracticeFormData, State } from '../../types/practiceForm.types';

const stateCityMap: Record<State, string[]> = {
    [State.NCR]: ['Delhi', 'Gurgaon', 'Noida'],
    [State.UttarPradesh]: ['Agra', 'Lucknow', 'Merrut'],
    [State.Haryana]: ['Karnal', 'Panipat'],
    [State.Rajasthan]: ['Jaipur', 'Jaiselmer'],
};

const state = faker.helpers.arrayElement(Object.values(State));
const city = faker.helpers.arrayElement(stateCityMap[state]);

export const practiceFormData: PracticeFormData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement(Object.values(Gender)),
    mobile: faker.string.numeric(10),
    hobbies: faker.helpers.arrayElements(Object.values(Hobby), 1),
    currentAddress: faker.location.streetAddress(),
    state,
    city,
};
