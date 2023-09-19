import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Payment, Status } from '../../types/payments';
import { Button, ButtonGroup, Dropdown, DropdownButton, Form, Modal, Table } from 'react-bootstrap';
import { StatusIcon } from '../shared/StatusIcon';
import { faDollarSign, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPaymentAPI, updatePaymentAPI } from '../../api/paymentApi';
import { updatePayment } from '../../store/slices/expenses';
import { useEffect, useState } from 'react';
import { defaultPayment } from '../../helpers/defaultValues';
import { addMessage } from '../../store/slices/messages/messageSlice';
import { CreditCard } from '../../types/creditCard';
import { PaymentSummary } from './PaymentSummary';
import { findExpense } from '../../helpers/expensesHelpers';
import { formatCurrency } from '../../helpers/currencyHelpers';
interface Props {
    payments: Payment[];
}
export const PaymentTable = ({ payments }: Props) => {
    const { expenses } = useAppSelector(({ expensesState }) => expensesState);
    const { creditCards } = useAppSelector(({ creditCardsState }) => creditCardsState);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment>({ ...defaultPayment });
    const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
    const [selectedCreditCard, setSelectedCreditCard] = useState<CreditCard | undefined>(undefined);
    const [paymentFilter, setPaymentFilter] = useState('');

    useEffect(() => {
        let paymentsToShow = payments;
        if (selectedCreditCard !== undefined) {
            paymentsToShow = paymentsToShow.filter(payment => findExpense(expenses, payment)?.creditCardId === selectedCreditCard.id);
        }
        if (paymentFilter !== '') {
            paymentsToShow = paymentsToShow.filter(payment => {
                const expense = findExpense(expenses, payment);
                if (expense === undefined) {
                    return false;
                }
                return (
                    expense.ccName.toLowerCase().includes(paymentFilter.toLowerCase()) ||
                    expense.title.toLowerCase().includes(paymentFilter.toLowerCase()) ||
                    payment.amount.toString().includes(paymentFilter.toLowerCase()) ||
                    payment.status.toLowerCase().includes(paymentFilter.toLowerCase()) ||
                    payment.amount.toString().includes(paymentFilter.toLowerCase())
                );
            });
        }

        setFilteredPayments(paymentsToShow);
    }, [payments, selectedCreditCard, paymentFilter, expenses]);

    const getStatusClassName = (status: Status): string => {
        switch (status) {
            case 'unconfirmed':
                return 'table-warning';
            case 'confirmed':
                return 'table-primary';
            case 'paid':
                return 'table-success';
            case 'canceled':
                return 'table-danger';
            case 'simulated':
                return 'table-secondary';

            default:
                return '';
        }
    };
    const handleUpdate = async (payment: Payment) => {
        try {
            const updated = await updatePaymentAPI(payment);
            dispatch(
                updatePayment({
                    paymentId: payment.id,
                    payment: updated,
                }),
            );
            dispatch(
                addMessage({
                    text: 'saving success',
                    title: 'Success',
                    subtitle: '',
                    type: 'success',
                }),
            );
        } catch (error) {
            dispatch(
                addMessage({
                    text: 'Error on saving payment',
                    title: 'Saving Error',
                    subtitle: '',
                    type: 'error',
                }),
            );
            console.error(error);
        }
    };
    const handleUpdateAmount = (payment: Payment) => {
        setSelectedPayment(payment);
        setShowModal(true);
    };
    const handleAddSubscription = async (payment: Payment) => {
        try {
            const created = await createPaymentAPI({
                ...payment,
                status: 'unconfirmed',
            });
            dispatch(
                updatePayment({
                    paymentId: payment.id,
                    payment: created,
                }),
            );
            dispatch(
                addMessage({
                    text: 'saving success',
                    title: 'Success',
                    subtitle: '',
                    type: 'success',
                }),
            );
        } catch (error) {
            dispatch(
                addMessage({
                    text: 'Error on saving payment',
                    title: 'Saving Error',
                    subtitle: '',
                    type: 'error',
                }),
            );
            console.error(error);
        }
    };
    const handleCreditCardSelected = (name: string, value: string) => {
        if (name === 'ccSelect') {
            const ccId = parseInt(value);
            setSelectedCreditCard(creditCards.find(cc => cc.id === ccId));
        }
        if (name === 'filterField') {
            setPaymentFilter(value);
        }
    };

    return (
        <>
            {/* Select Credit Card */}
            <PaymentSummary creditCards={creditCards} payments={filteredPayments} handleChange={handleCreditCardSelected} />

            {/* Table */}
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Credit Card</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Fee</th>
                        <th>Amount</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayments.map(payment => {
                        const expense = findExpense(expenses, payment);
                        const fee = expense?.type === 'purchase' ? `${payment.number}/${expense?.totalInstallments}` : '---';
                        const amount = formatCurrency(payment.amount);
                        return (
                            <tr key={payment.id} className={getStatusClassName(payment.status)}>
                                <td>{expense?.creditCardName}</td>
                                <td>{expense?.title}</td>
                                <td>
                                    <StatusIcon status={payment.status} />
                                </td>
                                <td>{fee}</td>
                                <td>{amount}</td>
                                <td>
                                    <ButtonGroup aria-label="Actions">
                                        {payment.status === 'simulated' ? (
                                            <Button variant="primary" onClick={() => handleAddSubscription(payment)}>
                                                <FontAwesomeIcon icon={faFileCirclePlus} />
                                            </Button>
                                        ) : (
                                            <Button variant="success" onClick={() => handleUpdateAmount(payment)}>
                                                <FontAwesomeIcon icon={faDollarSign} />
                                            </Button>
                                        )}
                                        <DropdownButton
                                            disabled={payment.status === 'simulated'}
                                            as={ButtonGroup}
                                            title="Status"
                                            id="bg-status-dropdown">
                                            {payment.status !== 'unconfirmed' && (
                                                <Dropdown.Item onClick={() => handleUpdate({ ...payment, status: 'unconfirmed' })}>
                                                    Unconfirmed
                                                </Dropdown.Item>
                                            )}
                                            {payment.status !== 'confirmed' && (
                                                <Dropdown.Item onClick={() => handleUpdate({ ...payment, status: 'confirmed' })}>
                                                    Confirmed
                                                </Dropdown.Item>
                                            )}
                                            {payment.status !== 'paid' && (
                                                <Dropdown.Item onClick={() => handleUpdate({ ...payment, status: 'paid' })}>Paid</Dropdown.Item>
                                            )}
                                        </DropdownButton>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <AmountUpdateModal show={showModal} handleClose={() => setShowModal(false)} payment={selectedPayment} updateAmount={handleUpdate} />
            </Table>
        </>
    );
};

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    updateAmount: (payment: Payment) => void;
    payment: Payment;
}
const AmountUpdateModal = ({ show, handleClose, payment, updateAmount }: ModalProps) => {
    const [amount, setAmount] = useState<number>(payment.amount);
    const handleSave = () => {
        updateAmount({ ...payment, amount });
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update pricing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="paymentAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            defaultValue={payment.amount}
                            autoFocus
                            onChange={e => setAmount(parseFloat(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
