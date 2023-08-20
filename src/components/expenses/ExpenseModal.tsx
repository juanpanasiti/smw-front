import { Modal } from "react-bootstrap"
import { Expense, ExpenseFormData, Purchase, Subscription } from "../../types/expenses"
import { ExpenseForm } from "./ExpenseForm"
import { createPurchaseAPI, createSubscriptionAPI, updatePurchaseAPI, updateSubscriptionAPI } from "../../api/expenseApi"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { updateExpenseList } from "../../store/slices/expenses"
import { purchseToExpenseItem, subscriptionToExpenseItem } from "../../helpers/expensesHelpers"
import { addMessage } from "../../store/slices/messages/messageSlice"

interface Props {
	expense: Expense,
	show: boolean,
	handleClose: () => void,
}
export const ExpenseModal = ({ expense, show, handleClose }: Props) => {
	const dispatch = useAppDispatch()
	const { creditCards } = useAppSelector(({ creditCardsState }) => creditCardsState);
	const handleSave = async (expenseData: ExpenseFormData) => {
		const creditCard = creditCards.find(cc => cc.id === parseInt(expenseData.creditCardId.toString()))
		if (!creditCard){
			dispatch(addMessage({
				text: 'No credit card selected',
				title: 'Credit Card Error',
				subtitle:'',
				type: 'error',
			}))
			return
		}

		try {
			let expense: Expense
			if (expenseData.type === 'purchase' && expenseData.id !== 0) {
				const apiResponse: Purchase = await updatePurchaseAPI(expenseData)
				expense = purchseToExpenseItem(creditCard, apiResponse);
				dispatch(updateExpenseList(expense));
			} else if (expenseData.type === 'purchase' && expenseData.id === 0) {
				const apiResponse: Purchase = await createPurchaseAPI(expenseData)
				expense = purchseToExpenseItem(creditCard, apiResponse);
			} else if (expenseData.type === 'subscription' && expenseData.id) {
				const apiResponse: Subscription = await updateSubscriptionAPI(expenseData)
				expense = subscriptionToExpenseItem(creditCard, apiResponse);
			} else if (expenseData.type === 'subscription' && !expenseData.id) {
				const apiResponse: Subscription = await createSubscriptionAPI(expenseData)
				expense = subscriptionToExpenseItem(creditCard, apiResponse);
			} else {
				return
			}
			dispatch(updateExpenseList(expense));
			dispatch(addMessage({
				text: 'saving success',
				title: 'Success',
				subtitle: '',
				type: 'success'
			}))
			handleClose()
		} catch (error) {
			dispatch(addMessage({
				text: 'Error on saving expense',
				title: 'Saving Error',
				subtitle:'',
				type: 'error',
			}))
			console.error(error)
		}
	}
	return (
		<Modal
			size="lg"
			show={show}
			onHide={handleClose}
			aria-labelledby="expense-modal"
		>
			<Modal.Header closeButton>
				<Modal.Title id="expense-modal-title">
					{expense.id ? expense.title : 'New'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ExpenseForm expense={expense} handleSave={handleSave} />
			</Modal.Body>
		</Modal>
	)
}
