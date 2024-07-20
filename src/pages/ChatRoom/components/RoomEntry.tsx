import { Message } from "./Type";

interface RoomEntryProps {
    roomId: number;
    roomName: string;
    lastMessage: Message | null;
    onRoomSelect: (selectedRoomId: number, selectedRoomName: string ) => void;
}

export default function RoomEntry ( props: RoomEntryProps ) {
    const handleClick = () => {
        props.onRoomSelect(props.roomId, props.roomName);
    };

    if (props.lastMessage === null) {
        return (
            <div className='room-entry' onClick={handleClick}>
                <div className="room-entry-header">
                    <h3>{props.roomName}</h3>
                </div>
                <p>No message yet.</p>
            </div>
        )
    } else {
        const time = formatDate(props.lastMessage.time);
        return (
            <div className='room-entry' onClick={handleClick}>
                <div className="room-entry-header">
                    <h3>{props.roomName}</h3>
                    <p>{time}</p>
                </div>
                <p>{props.lastMessage?.sender}: {props.lastMessage?.content}</p>
            </div>
        )
    }
}

function formatDate(timestamp: number): string {
    const now = new Date();
    const msgDate = new Date(timestamp);

    const diffInMilliseconds = now.getTime() - msgDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return msgDate.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
        return 'Yesterday';
    } else {
        return msgDate.toLocaleDateString('default', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
}