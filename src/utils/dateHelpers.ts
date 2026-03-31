export const formatDate = (date: Date): string => {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
};

export const subtractYears = (years: number): Date => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date;
};
