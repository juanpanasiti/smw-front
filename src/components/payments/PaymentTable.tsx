import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { Expense } from '../../types/expenses';
import { Payment, Status } from '../../types/payments'
import { Button, ButtonGroup, Dropdown, DropdownButton, Form, Modal, Table } from 'react-bootstrap'
import { StatusIcon } from '../shared/StatusIcon';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updatePaymentAPI } from '../../api/paymentApi';
import { updatePayment } from '../../store/slices/expenses';
import { useState } from 'react';
import { defaultPayment } from '../../helpers/defaultValues';
interface Props {
    payments: Payment[],
}
export const PaymentTable = ({ payments }: Props) => {
    const { expenses } = useAppSelector(({ expensesState }) => expensesState);
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState<Payment>({ ...defaultPayment })
    const findExpense = (payment: Payment): Expense | undefined => {
        return expenses.find(expense => expense.id === payment.expenseId)
    }
    const getStatusClassName = (status: Status): string => {
        switch (status) {
            case 'unconfirmed':
                return 'table-warning'
            case 'confirmed':
                return 'table-primary'
            case 'paid':
                return 'table-success'
            case 'canceled':
                return 'table-danger'
            case 'simulated':
                return 'table-secondary'

            default:
                return ''
        }
    }
    const handleUpdate = async (payment: Payment) => {
        try {
            const updated = await updatePaymentAPI(payment)
            dispatch(updatePayment(updated))
        } catch (error) {
            console.error(error)
        }
    }
    const handleUpdateAmount = (payment: Payment) => {
        setSelectedPayment(payment)
        setShowModal(true)
    }
    return (
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
                {
                    payments.map(payment => {
                        const expense = findExpense(payment)
                        const fee = expense?.type === 'purchase' ? `${payment.number}/${expense?.totalInstallments}` : '---'
                        const amount = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(payment.amount)
                        return (
                            <tr key={payment.id} className={getStatusClassName(payment.status)}>
                                <td>{expense?.creditCardName}</td>
                                <td>{expense?.title}</td>
                                <td><StatusIcon status={payment.status} /></td>
                                <td>{fee}</td>
                                <td>{amount}</td>
                                <td>
                                    <ButtonGroup aria-label="Actions">
                                        <Button disabled={payment.status === 'simulated'} variant="success" onClick={() => handleUpdateAmount(payment)}><FontAwesomeIcon icon={faDollarSign} /></Button>
                                        <DropdownButton disabled={payment.status === 'simulated'} as={ButtonGroup} title="Status" id="bg-status-dropdown">
                                            {payment.status !== 'unconfirmed' && <Dropdown.Item onClick={() => handleUpdate({ ...payment, status: 'unconfirmed' })}>Unconfirmed</Dropdown.Item>}
                                            {payment.status !== 'confirmed' && <Dropdown.Item onClick={() => handleUpdate({ ...payment, status: 'confirmed' })}>Confirmed</Dropdown.Item>}
                                            {payment.status !== 'paid' && <Dropdown.Item onClick={() => handleUpdate({ ...payment, status: 'paid' })}>Paid</Dropdown.Item>}
                                        </DropdownButton>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            <AmountUpdateModal show={showModal} handleClose={() => setShowModal(false)} payment={selectedPayment} updateAmount={handleUpdate} />
        </Table>
    )
}

interface ModalProps {
    show: boolean,
    handleClose: () => void,
    updateAmount: (payment:Payment) => void,
    payment: Payment,
}
const AmountUpdateModal = ({ show, handleClose, payment, updateAmount }: ModalProps) => {
    const [amount, setAmount] = useState<number>(payment.amount)
    const handleSave = () => {
        updateAmount({...payment,amount})
        handleClose()
    }
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
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
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
    )
}