import { Button, Col, Row } from "react-bootstrap"
import { CreditCardInfo } from "../components/creditCards"
import { useAppSelector } from "../hooks/reduxHooks"
import { useState } from "react"
import { defaultCreditCard } from "../helpers/defaultValues"
import { CreditCard } from "../types/creditCard"
import { CreditCardModal } from "../components/creditCards/CreditCardModal"


export const CreditCardsPage = () => {
    const { creditCards, isLoading } = useAppSelector(({ creditCardsState }) => creditCardsState)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedCreditCard, setSelectedCreditCard] = useState({...defaultCreditCard})

    const handleShow = (creditCard: CreditCard) => {
        setSelectedCreditCard(creditCard)
        setShowModal(true)
    }
    return (
        <>
            <h2>Credit Cards</h2>
            <hr />
            {isLoading && <p>Loading...</p>}
            <CreditCardModal show={showModal} creditCard={selectedCreditCard} handleClose={() => setShowModal(false)} />
            <Button variant='success' onClick={() => handleShow({ ...defaultCreditCard })} >New</Button>
            <Row >
                {
                    creditCards.map(creditCard => (
                        <Col key={creditCard.id} sm={12} md={6} lg={6} xl={6} xxl={4} >
                            <CreditCardInfo creditCard={creditCard} handleShow={handleShow} />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}
