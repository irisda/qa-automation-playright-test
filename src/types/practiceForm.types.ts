export type Gender = 'Male' | 'Female' | 'Other';

export type Hobby = 'Sports' | 'Reading' | 'Music';

export type PracticeFormData = {
    firstName: string;
    lastName: string;
    gender: Gender;
    mobile: string;
    email?: string;
    dateOfBirth?: string; // MM/DD/YYYY
    subjects?: string[];
    hobbies?: Hobby[];
    currentAddress?: string;
    state?: string;
    city?: string;
};
