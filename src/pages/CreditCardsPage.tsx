import { Col, Row } from "react-bootstrap"
import { CreditCardInfo } from "../components/creditCards"
import { useAppSelector } from "../hooks/reduxHooks"


export const CreditCardsPage = () => {
    const { creditCards, isLoading } = useAppSelector(({ creditCardsState }) => creditCardsState)
    return (
        <>
            <h2>Credit Cards</h2>
            {isLoading && <p>Loading...</p>}
            <Row >
                {
                    creditCards.map(creditCard => (
                        <Col key={creditCard.id} sm={12} md={6} lg={6} xl={6} xxl={4} >
                            <CreditCardInfo creditCard={creditCard} />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}
