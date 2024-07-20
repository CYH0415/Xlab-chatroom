interface MessageProps {
    user: string;
    message: string;
}

export default function MessageItem ( props: MessageProps ) {
    return (
        <div className='message'>
            <h3>{props.user}</h3>
            <p>{props.message}</p>
        </div>
    )
}