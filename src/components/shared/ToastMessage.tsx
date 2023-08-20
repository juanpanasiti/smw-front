import { Toast } from 'react-bootstrap'
import { Message } from '../../types/message'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { delMessage } from '../../store/slices/messages/messageSlice'
import { getId } from '../../helpers/messageHelpers'

interface Props {
    message: Message
}
export const ToastMessage = ({ message }: Props) => {
    const { title, subtitle, text } = message
    const msgId = message.id || getId()
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(true)

    const handleClose = () => {
        console.log('close')
        setShow(false)
        setTimeout(() => { dispatch(delMessage(msgId)) }, 1000)
    }
    return (
        <Toast bg={message.type} show={show} onClose={handleClose} delay={3000} autohide >
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{title}</strong>
                <small>{subtitle}</small>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
        </Toast>

    )
}
