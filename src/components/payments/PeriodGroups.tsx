import { Accordion } from 'react-bootstrap'
import { Payment, Period } from '../../types/payments'
import { PaymentTable } from './PaymentTable'
import { formatCurrency } from '../../helpers/currencyHelpers'

interface Props {
    periods: Period[]
}

export const PeriodGroups = ({ periods }: Props) => {
    const sumPayments = (payments: Payment[]):string => {
        const sum = payments.reduce((sum, payment) => sum + payment.amount, 0)
        return formatCurrency(sum)
    }
    return (
        <Accordion>
            {
                periods.map(({payments, name}) => (
                    <Accordion.Item eventKey={name} key={name}>
                        <Accordion.Header>{name} ({sumPayments(payments)})</Accordion.Header>
                        <Accordion.Body>
                            <PaymentTable payments={payments} />
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }

        </Accordion>
    )
}
