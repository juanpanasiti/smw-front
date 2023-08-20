import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Expense, ExpenseFormData } from "../../types/expenses"
import { useForm } from "../../hooks/useForm"
import { expenseToForm } from "../../helpers/expensesHelpers"
import { useAppSelector } from "../../hooks/reduxHooks"


interface Props {
    expense: Expense,
    handleSave: (expenseFormData: ExpenseFormData) => void
}
export const ExpenseForm = ({ expense, handleSave }: Props) => {
    const expenseFormData: ExpenseFormData = expenseToForm(expense)
    const { values: formData, handleInputChange } = useForm<ExpenseFormData>(expenseFormData)
    const { creditCards } = useAppSelector(({ creditCardsState }) => creditCardsState);
    return (
        <Container>
            <Form>
                {/* Form field for Credit Card */}
                <Form.Group as={Row} controlId="formCreditCard" className="mb-1">
                    <Form.Label column sm={3}>
                        Credit Card
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            as='select'
                            name='creditCardId'
                            onChange={(e) => handleInputChange(parseInt(e.target.value), 'creditCardId')}
                            required>
                            {creditCards.map(cc => (
                                <option value={cc.id} selected={formData.creditCardId === cc.id}>{cc.name}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>

                {/* Form field for type */}
                <Form.Group as={Row} controlId="formType" className="mb-1">
                    <Form.Label column sm={3}>
                        Type
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            as='select'
                            name='type'
                            onChange={(e) => handleInputChange(e.target.value, 'type')}
                            required>
                            <option value='purchase' selected={formData.type === 'purchase'}>Purchase</option>
                            <option value='subscription' selected={formData.type === 'subscription'}>Subscription</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                {/* Form field for title */}
                <Form.Group as={Row} controlId="formTitle" className="mb-1">
                    <Form.Label column sm={3}>
                        Title
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={(e) => handleInputChange(e.target.value, 'title')}
                            required />
                    </Col>
                </Form.Group>

                {/* Form field for ccName */}
                <Form.Group as={Row} controlId="formCCName" className="mb-1">
                    <Form.Label column sm={3}>
                        Name in Credit Card
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type='text'
                            name='ccName'
                            value={formData.ccName}
                            onChange={(e) => handleInputChange(e.target.value, 'ccName')}
                            required />
                    </Col>
                </Form.Group>

                {/* Form field for totalAmount */}
                <Form.Group as={Row} controlId="formTotalAmount" className="mb-1">
                    <Form.Label column sm={3}>
                        Total Amount
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type='number'
                            name='totalAmount'
                            value={formData.totalAmount}
                            onChange={(e) => handleInputChange(parseFloat(e.target.value), 'totalAmount')}
                            required />
                    </Col>
                </Form.Group>

                {/* Form field for purchasedAt */}
                <Form.Group as={Row} controlId="formPurchasedAt" className="mb-1">
                    <Form.Label column sm={3}>
                        Purchased Date
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type='date'
                            name='purchasedAt'
                            value={formData.purchasedAt}
                            onChange={(e) => handleInputChange(e.target.value, 'purchasedAt')}
                            required />
                    </Col>
                </Form.Group>

                {/* Form field for totalInstallments */}
                {
                    formData.type === 'purchase' && (
                        <Form.Group as={Row} controlId="formTotalInstallments" className="mb-1">
                            <Form.Label column sm={3}>
                                Total Installments
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type='number'
                                    name='totalInstallments'
                                    min={1}
                                    value={formData.totalInstallments}
                                    onChange={(e) => handleInputChange(parseInt(e.target.value), 'totalInstallments')}
                                    disabled={!!formData.id}
                                    required />
                            </Col>
                        </Form.Group>
                    )
                }

                {/* Form field for firstInstallment */}
                {
                    formData.type === 'purchase' && !formData.id && (
                        <Form.Group as={Row} controlId="formFirstInstallment" className="mb-1">
                            <Form.Label column sm={3}>
                                First Installment
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type='date'
                                    name='firstInstallment'
                                    value={formData.firstInstallment}
                                    onChange={(e) => handleInputChange(e.target.value, 'firstInstallment')}
                                    required />
                            </Col>
                        </Form.Group>
                    )
                }

                {/* Form field for isActive */}
                {
                    formData.type === 'subscription' && (
                        <Form.Group as={Row} controlId="formIsActive" className="mb-1">
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="isActiveSwitch"
                                label="Is Active?"
                                checked={formData.isActive}
                                onChange={(e) => handleInputChange(e.target.value, 'isActive')}
                            />
                        </Form.Group>
                    )
                }

                <Button onClick={() => handleSave(formData)}>Save</Button>
            </Form>
        </Container>
    )
}
