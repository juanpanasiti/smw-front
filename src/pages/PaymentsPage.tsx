import { Tab, Tabs } from 'react-bootstrap'
import { useAppSelector } from '../hooks/reduxHooks'
import { getPaymentsFromExpenses, groupByPeriod, groupPayments } from '../helpers/expensesHelpers'
import { PaymentTable } from '../components/payments/PaymentTable'
import { PeriodGroups } from '../components/payments/PeriodGroups'
import { sortByDate } from '../helpers/dateHelpers'
import { useEffect, useState } from 'react'
import { PeriodsByValidity } from '../types/payments'
import { defaultGroupedPeriods } from '../helpers/defaultValues'

export const PaymentsPage = () => {
    const expenses = useAppSelector(state => state.expensesState.expenses)
    const [groupedPeriods, setGroupedPeriods] = useState<PeriodsByValidity>({...defaultGroupedPeriods})

    useEffect(() => {
        if (expenses.length > 0) {
            const subscriptions = expenses.filter(exp => exp.type === 'subscription')
            const payments = getPaymentsFromExpenses(expenses)
            const periods = groupByPeriod(payments, subscriptions)
            setGroupedPeriods(groupPayments(periods))
        }
    }, [expenses])


    return (
        <>
            <h2>Payments</h2>
            <hr />

            <Tabs
                defaultActiveKey="current"
                id="payments-tab"
                className="mb-3"
                fill
                justify
            >
                <Tab eventKey="previous" title="Previus">
                    {
                        groupedPeriods.previus.length === 0 &&
                        <p>No hay periodos anteriores</p>
                    }
                    {
                        groupedPeriods.previus.length !== 0 &&
                        <PeriodGroups periods={groupedPeriods.previus.sort(sortByDate)} />
                    }
                </Tab>

                <Tab eventKey="current" title="Current">
                    {
                        groupedPeriods.current.name !== "" &&
                        <PaymentTable payments={groupedPeriods.current.payments} />
                    }
                    {
                        groupedPeriods.current.name === "" &&
                        <p>No hay periodo actual</p>
                    }

                </Tab>

                <Tab eventKey="next" title="Next">
                    {
                        groupedPeriods.next.length === 0 &&
                        <p>No hay periodos posteriores</p>
                    }
                    {
                        groupedPeriods.next.length !== 0 &&
                        <PeriodGroups periods={groupedPeriods.next.sort(sortByDate)} />
                    }
                </Tab>
            </Tabs>
        </>
    )
}
