import { useEffect, useState } from 'react';
import { useAppSelector } from './reduxHooks';
import { Period, PeriodDataSet, PeriodsByValidity } from '../types/payments';
import { defaultGroupedPeriods } from '../helpers/defaultValues';
import { getPaymentsFromExpenses, groupByPeriod, groupPayments, calcPaymentsSum } from '../helpers/expensesHelpers';
import { sortByDate } from '../helpers/dateHelpers';

export const useGroupedPeriods = () => {
    const expenses = useAppSelector(state => state.expensesState.expenses);
    const [groupedPeriods, setGroupedPeriods] = useState<PeriodsByValidity>({ ...defaultGroupedPeriods });
    const [periodsDataSet, setPeriodsDataSet] = useState<PeriodDataSet[]>([]);

    useEffect(() => {
        if (expenses.length > 0) {
            const subscriptions = expenses.filter(exp => exp.type === 'subscription');
            const payments = getPaymentsFromExpenses(expenses);
            const periods = groupByPeriod(payments, subscriptions);
            setGroupedPeriods(groupPayments(periods));
        }
    }, [expenses]);

    useEffect(() => {
        const sortedGroups: Period[] = [groupedPeriods.current, ...groupedPeriods.next.sort(sortByDate)];
        setPeriodsDataSet([
            ...sortedGroups.map(period => {
                return {
                    name: period.name,
                    totalAmount: calcPaymentsSum(period.payments),
                };
            }),
        ]);
    }, [groupedPeriods]);

    return {
        groupedPeriods,
        periodsDataSet,
    };
};
