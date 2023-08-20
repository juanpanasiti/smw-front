import { Tab, Tabs } from 'react-bootstrap'
import { useAppSelector } from '../hooks/reduxHooks'
import { getPaymentsFromExpenses, groupByPeriod, groupPayments } from '../helpers/expensesHelpers'
import { PaymentTable } from '../components/payments/PaymentTable'
import { PeriodGroups } from '../components/payments/PeriodGroups'
import { sortByDate } from '../helpers/dateHelpers'

export const PaymentsPage = () => {
    const expenses = useAppSelector(state => state.expensesState.expenses)
    const payments = getPaymentsFromExpenses(expenses)
    const periods = groupByPeriod(payments)
    const groupedPeriods = groupPayments(periods)

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
