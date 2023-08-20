import { Period } from '../types/payments';

export const formatDateToMonthYear = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${month}/${year}`;
};

export const getLastDayOfMonth = (year: number, month: number): Date => {
    return new Date(year, month, 0);
};

export const getFirstDayOfMonth = (year: number, month: number): Date => {
    const firstDay = new Date(year, month - 1, 1);
    return firstDay;
};

export const compareMonthYear = (period: string): -1 | 0 | 1 => {
    const currentDate = new Date();
    const [month, year] = period.split('/').map(Number);

    const targetDate = new Date(year, month - 1, 1);

    if (currentDate.getFullYear() === year && currentDate.getMonth() === month - 1) {
        return 0;
    } else if (currentDate > targetDate) {
        return -1;
    } else {
        return 1;
    }
};

export const sortByDate = (a: Period, b: Period): -1 | 0 | 1 => {
    const dateA = new Date(`${a.payments[0].year}-${a.payments[0].month}`);
    const dateB = new Date(`${b.payments[0].year}-${b.payments[0].month}`);
    if (dateA > dateB) {
        return 1;
    } else if (dateA < dateB) {
        return -1;
    } else {
        return 0;
    }
};
