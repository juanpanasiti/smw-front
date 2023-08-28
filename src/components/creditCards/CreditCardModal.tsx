import { Modal } from 'react-bootstrap'
import { CreditCardForm } from './CreditCardForm'
import { CreditCard } from '../../types/creditCard'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { createCreditCardAPI, updateCreditCardAPI } from '../../api/creditCardApi'
import { updateCreditCardList } from '../../store/slices/creditCards'
import { addMessage } from '../../store/slices/messages/messageSlice'


interface Props {
    creditCard: CreditCard,
    show: boolean,
    handleClose: () => void,
}
export const CreditCardModal = ({ creditCard, show, handleClose }: Props) => {
    const dispatch = useAppDispatch()

    const handleSave = async (creditCard: CreditCard) => {
        try {
            let apiResponse: CreditCard
            if (creditCard.id !== 0) {
                apiResponse = await updateCreditCardAPI(creditCard)
            } else {
                apiResponse = await createCreditCardAPI(creditCard)
            }
            dispatch(updateCreditCardList(apiResponse))
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
            aria-labelledby="creditCard-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="creditCard-modal-title">
                    {creditCard.id ? creditCard.name : 'New'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreditCardForm creditCard={creditCard} handleSave={handleSave} />
            </Modal.Body>
        </Modal>
    )
}
