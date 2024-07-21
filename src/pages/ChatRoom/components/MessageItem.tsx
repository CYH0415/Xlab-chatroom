import { Message } from "./Type";
import { formatDate } from "../../../utils/utils";

interface MessageProps {
    message: Message,
    currentUser: string,
}

export default function MessageItem ( props: MessageProps ) {
    const className = ( 
        props.message.sender === props.currentUser 
        ? "message right"
        : "message left"
    )

    const time = formatDate(props.message.time)

    return (
        <div className={className}>
            <h3>{props.message.sender || "Anonymous"}</h3>
            <div className="message-box">
                <p>{props.message.content}</p>
                <span>{time}</span>
            </div>
        </div>
    )
}