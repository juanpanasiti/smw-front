import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Table } from 'react-bootstrap';

import { Expense } from '../../types/expenses';
import { formatCurrency } from '../../helpers/currencyHelpers';
import { useState } from 'react';
import { defaultExpense } from '../../helpers/defaultValues';
import { ExpenseShowModal } from './ExpenseShowModal';

interface Props {
    expenses: Expense[];
    handleShowEdit: (expense: Expense) => void;
}
export const ExpenseTable = ({ expenses, handleShowEdit }: Props) => {
    const [showInfo, setShowInfo] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState({ ...defaultExpense });

    const handleShowInfo = (expense: Expense) => {
        setSelectedExpense(expense);
        setShowInfo(true);
    };
    const getStatusClassName = (remaining: number | '---', total: number): string => {
        if(remaining === '---'){
            return 'table-primary';
        }else if (remaining === 1) {
            return 'table-success';
        } else if (remaining === total) {
            return 'table-warning';
        } else {
            return 'table-primary';
        }
    };

    return (
        <>
            <ExpenseShowModal expense={selectedExpense} handleClose={() => setShowInfo(false)} show={showInfo} />
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Credit Card</th>
                        <th>Total Amount ($)</th>
                        <th>Remaining Amount ($)</th>
                        <th>Remaining Inst.</th>
                        <th>Purchased At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(exp => {
                        const remainingAmount = typeof exp.remainingAmount === 'string' ? exp.remainingAmount : formatCurrency(exp.remainingAmount);
                        const remainingInstallment = exp.type === 'subscription' ? '---' : exp.remainingInstallment;
                        return (
                            <tr key={exp.id} className={getStatusClassName(remainingInstallment, exp.totalInstallments)}>
                                <td>{exp.title}</td>
                                <td>{exp.type === 'purchase' ? 'P' : 'S'}</td>
                                <td>{exp.creditCardName}</td>
                                <td>{formatCurrency(exp.totalAmount)}</td>
                                <td>{remainingAmount}</td>
                                <td>{remainingInstallment}</td>
                                <td>{exp.purchasedAt}</td>
                                <td>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="outline-info">
                                            <FontAwesomeIcon icon={faEye} onClick={() => handleShowInfo(exp)} />
                                        </Button>
                                        <Button variant="outline-warning">
                                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleShowEdit(exp)} />
                                        </Button>
                                        <Button variant="outline-danger">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
};
