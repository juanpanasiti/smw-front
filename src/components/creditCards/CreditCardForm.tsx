import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import { CreditCard } from '../../types/creditCard'
import { useForm } from '../../hooks/useForm'


interface Props {
    creditCard: CreditCard,
    handleSave: (creditCardFormData: CreditCard) => void
}
export const CreditCardForm = ({ creditCard, handleSave }: Props) => {
    const { values: formData, handleInputChange } = useForm<CreditCard>(creditCard)
    return (
        <Container>
            <Form>

                {/* Form field for name */}
                <Form.Group as={Row} controlId="formName" className="mb-1">
                    <Form.Label column sm={3}>
                        Name
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={(e) => handleInputChange(e.target.value, 'name')}
                            required />
                    </Col>
                </Form.Group>

                {/* Form field for limit */}
                <Form.Group as={Row} controlId="formLimit" className="mb-1">
                    <Form.Label column sm={3}>
                        Limit
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type='number'
                            name='limit'
                            value={formData.limit}
                            onChange={(e) => handleInputChange(parseFloat(e.target.value), 'limit')}
                            required />
                    </Col>
                </Form.Group>

               

                <Button onClick={() => handleSave(formData)}>Save</Button>
            </Form>
        </Container>
    )
}
