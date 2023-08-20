import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Status } from "../../types/payments"
import { faCheck, faCheckDouble, faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
    status: Status
}

export const StatusIcon = ({ status }: Props) => {
    switch (status) {
        case 'unconfirmed':
            return <FontAwesomeIcon icon={faQuestion} />
        case 'confirmed':
            return <FontAwesomeIcon icon={faCheck} />
        case 'paid':
            return <FontAwesomeIcon icon={faCheckDouble} />
        case 'canceled':
            return <FontAwesomeIcon icon={faXmark} />
        default:
            return <FontAwesomeIcon icon={faQuestion} />
    }
}
