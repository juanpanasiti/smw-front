import { Button } from 'react-bootstrap';
import { useAppSelector } from '../hooks/reduxHooks';
import { useState } from 'react';
import { defaultExpense } from '../helpers/defaultValues';
import { Expense } from '../types/expenses';
import { ExpenseModal } from '../components/expenses/ExpenseModal';
import { ExpenseTable } from '../components/expenses/ExpenseTable';
import { selectActiveExpenses } from '../helpers/selector.helpers';

export const ExpensesPage = () => {
    const expenses = useAppSelector(status => selectActiveExpenses(status));
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedExpense, setSelectedExpense] = useState<Expense>({ ...defaultExpense });

    const handleShow = (expense: Expense) => {
        setSelectedExpense(expense);
        setShowModal(true);
    };

    return (
        <>
            <h2>Expenses</h2>
            <hr />
            <ExpenseModal show={showModal} expense={selectedExpense} handleClose={() => setShowModal(false)} />
            <Button variant="success" onClick={() => handleShow({ ...defaultExpense })}>
                New
            </Button>
            <ExpenseTable expenses={expenses} handleShowEdit={handleShow} />
        </>
    );
};
