export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

export enum Hobby {
    Sports = 'Sports',
    Reading = 'Reading',
    Music = 'Music',
}

export enum State {
    NCR = 'NCR',
    UttarPradesh = 'Uttar Pradesh',
    Haryana = 'Haryana',
    Rajasthan = 'Rajasthan',
}

export type PracticeFormData = {
    firstName: string;
    lastName: string;
    gender: Gender;
    mobile?: string;
    email?: string;
    dateOfBirth?: string; // MM/DD/YYYY
    subjects?: string[];
    hobbies?: Hobby[];
    currentAddress?: string;
    state?: State;
    city?: string;
};
