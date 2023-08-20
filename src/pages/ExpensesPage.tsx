import { Button, ButtonGroup, Table } from 'react-bootstrap'
import { useAppSelector } from '../hooks/reduxHooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { defaultExpense } from '../helpers/defaultValues'
import { Expense } from '../types/expenses'
import { ExpenseModal } from '../components/expenses/ExpenseModal'

export const ExpensesPage = () => {
    const expenses = useAppSelector(({ expensesState }) => expensesState.expenses)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedExpense, setSelectedExpense] = useState<Expense>({ ...defaultExpense })

    const handleShow = (expense: Expense) => {
        setSelectedExpense(expense)
        setShowModal(true)
    }

    return (
        <>
            <h2>Expenses</h2>
            <hr />
            <ExpenseModal show={showModal} expense={selectedExpense} handleClose={() => setShowModal(false)} />
            <Button variant='success' onClick={() => handleShow({ ...defaultExpense })} >New</Button>
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Credit Card</th>
                        <th>Total Amount ($)</th>
                        <th>Remaining Amount ($)</th>
                        <th>Installments</th>
                        <th>Purchased At</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map(exp => (
                            <tr key={exp.id}>
                                <td>{exp.title}</td>
                                <td>{exp.type}</td>
                                <td>{exp.creditCardName}</td>
                                <td>{exp.totalAmount}</td>
                                <td>{exp.remainingAmount}</td>
                                <td>{exp.remainingInstallment}</td>
                                <td>{exp.purchasedAt}</td>
                                <td>{exp.isActive ? 'Y' : 'N'}</td>
                                <td>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="outline-info">
                                            <FontAwesomeIcon icon={faEye} />
                                        </Button>
                                        <Button variant="outline-warning">
                                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleShow(exp)} />
                                        </Button>
                                        <Button variant="outline-danger">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}
