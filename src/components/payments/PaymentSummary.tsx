import { Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

import { CreditCard } from '../../types/creditCard';
import { Payment } from '../../types/payments';
import { useEffect, useState } from 'react';
import { calcPaymentsSum } from '../../helpers/expensesHelpers';

interface Props {
    payments: Payment[];
    creditCards: CreditCard[];
    handleChange: (name: string, value: string) => void;
}
export const PaymentSummary = ({ payments, creditCards, handleChange }: Props) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalConfirmed, setTotalConfirmed] = useState(0);
    useEffect(() => {
        setTotalAmount(calcPaymentsSum(payments));
        setTotalConfirmed(calcPaymentsSum(payments.filter(payment => payment.status === 'confirmed' || payment.status === 'paid')));
    }, [payments]);


    return (
        <StyledRow>
            <Col xs={12} sm={6} md={4} lg={4} xl={3}>
                <Form.Control type="text" placeholder="Filter" name='filterField' onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </Col>
            <Col xs={12} sm={6} md={4} lg={4} xl={3}>
                <Form.Select aria-label="Default select example" name="ccSelect" onChange={(e) => handleChange(e.target.name, e.target.value)}>
                    <option value={0}>All</option>
                    {creditCards.map(cc => (
                        <option value={cc.id} key={cc.id}>
                            {cc.name}
                        </option>
                    ))}
                </Form.Select>
            </Col>
            <StyledTotalContainer xs={12} sm={6} md={8} lg={4} xl={6}>
                <div>
                    <span>Total:</span> {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalAmount)}
                </div>
                <div>
                    <span>Total confirmado:</span> {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalConfirmed)}
                </div>
            </StyledTotalContainer>
        </StyledRow>
    );
};

const StyledRow = styled(Row)`
    align-items: center;
`;
const StyledTotalContainer = styled(Col)`
    display: flex;
    flex-direction: column;
    span {
        font-weight: bolder;
    }
`;
