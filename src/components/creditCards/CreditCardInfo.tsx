import styled from 'styled-components';
import { Button, ButtonGroup, ListGroup, Tab, Tabs } from "react-bootstrap"
import { CreditCard } from "../../types/creditCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale, faEye, faFileInvoiceDollar, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from '../../hooks/reduxHooks';


interface Props {
    creditCard: CreditCard
    handleShow: (creditCard: CreditCard) => void
}
export const CreditCardInfo = ({ creditCard, handleShow }: Props) => {
    const expenses = useAppSelector(({ expensesState }) => expensesState.expenses.filter(exp => exp.creditCardId === creditCard.id))
    const subscriptions = expenses.filter(exp => exp.type === 'subscription')
    const purchases = expenses.filter(exp => exp.type === 'purchase')

    const calcAvailable = (): string => {
        const purchasesAmount = purchases.reduce((sum, expense) => {
            return sum + expense.payments
                .filter(payment => payment.status === 'confirmed' || payment.status === 'unconfirmed')
                .reduce((paymentSum, payment) => paymentSum + payment.amount, 0);
        }, 0)

        return (creditCard.limit - purchasesAmount).toFixed(2)
    }

    return (
        <StyledContainer>
            <StyledTitle>{creditCard.name}</StyledTitle>
            <Tabs
                defaultActiveKey="info"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                {/* INFO TAB */}
                <Tab eventKey="info" title="Info">
                    <ListGroup variant="flush">
                        <StyledRowData>
                            <StyledRowDataTitle>
                                <FontAwesomeIcon icon={faBalanceScale} />
                                <span>Balance</span>
                            </StyledRowDataTitle>
                            <StyledRowDataBody>
                                <span><b>Limit: </b>${creditCard.limit}</span>
                                <span><b>Available: </b>${calcAvailable()}</span>
                            </StyledRowDataBody>
                        </StyledRowData>
                        <StyledRowData>
                            <StyledRowDataTitle>
                                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                                <span>Expenses</span>
                            </StyledRowDataTitle>
                            <StyledRowDataBody>
                                <span><b>Subscriptions: </b>{subscriptions.length}</span>
                                <span><b>Purchases: </b>{purchases.length}</span>
                            </StyledRowDataBody>
                        </StyledRowData>
                        <StyledRowData>
                            <StyledRowDataTitle>
                                <FontAwesomeIcon icon={faEye} />
                                <span>Actions</span>
                            </StyledRowDataTitle>
                            <StyledRowDataBody>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="outline-info">
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                    <Button variant="outline-warning">
                                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleShow(creditCard)} />
                                    </Button>
                                    <Button variant="outline-danger">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </Button>
                                </ButtonGroup>
                            </StyledRowDataBody>
                        </StyledRowData>
                    </ListGroup>
                </Tab>

                {/* CURRENT TAB */}
                <Tab eventKey="current" title="Current">
                    Tab content for Profile
                </Tab>

                {/* NEXT TAB */}
                <Tab eventKey="next" title="Next" >
                    Tab content for Contact
                </Tab>

                {/* PREVIOUS TAB */}
                <Tab eventKey="previous" title="Previous" >
                    Tab content for Contact
                </Tab>
            </Tabs>
        </StyledContainer >
    )
}

const StyledContainer = styled.div`
    border: crimson 1px solid;
    border-radius: 12px;
    margin-bottom: .5rem;
    padding: .5rem;
`;
const StyledTitle = styled.h2`
    
`

const StyledRowDataTitle = styled.h4`
    display:flex;
    column-gap: 5px;
`
const StyledRowData = styled(ListGroup.Item)`
    display: flex;
    flex-direction: column;
`

const StyledRowDataBody = styled.div`
    display: flex;
    justify-content: space-around;
`