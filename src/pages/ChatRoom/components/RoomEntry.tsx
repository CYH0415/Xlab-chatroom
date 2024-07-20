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
        return (
            <div className='room-entry' onClick={handleClick}>
                <div className="room-entry-header">
                    <h3>{props.roomName}</h3>
                    <p>{props.lastMessage?.time}</p>
                </div>
                <p>{props.lastMessage?.sender}: {props.lastMessage?.content}</p>
            </div>
        )
    }
}
