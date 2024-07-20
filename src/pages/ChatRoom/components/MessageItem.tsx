import { Message } from "./Type";

interface MessageProps {
    message: Message
}

export default function MessageItem ( props: MessageProps ) {
    return (
        <div className='message-box'>
            <h3>{props.message.sender}</h3>
            <p>{props.message.content}</p>
        </div>
    )
}