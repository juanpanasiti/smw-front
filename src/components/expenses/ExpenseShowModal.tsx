import { Modal, Table } from 'react-bootstrap';
import { Expense } from '../../types/expenses';
import { formatCurrency } from '../../helpers/currencyHelpers';
import { StatusIcon } from '../shared/StatusIcon';

interface Props {
    expense: Expense;
    show: boolean;
    handleClose: () => void;
}
export const ExpenseShowModal = ({ expense, show, handleClose }: Props) => {
    const payments = [...expense.payments].sort((a, b) => a.number - b.number);
    return (
        <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="expense-modal">
            <Modal.Header closeButton>
                <Modal.Title id="expense-modal-title">{expense.id ? expense.title : 'New'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Period</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.number}</td>
                                <td>{formatCurrency(payment.amount)}</td>
                                <td>
                                    <StatusIcon status={payment.status} />
                                </td>
                                <td>{`${payment.month}/${payment.year}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};
