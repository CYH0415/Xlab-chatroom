import { Message } from "./Type";
import { formatDate } from "../../../utils/utils";

interface RoomEntryProps {
    roomId: number;
    roomName: string;
    lastMessage: Message | null;
    onRoomSelect: (selectedRoomId: number, selectedRoomName: string ) => void;
    onRoomDelete: (selectedRoomId: number) => void;
}

export default function RoomEntry ( props: RoomEntryProps ) {
    const handleClick = () => {
        props.onRoomSelect(props.roomId, props.roomName);
    };

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        props.onRoomDelete(props.roomId);
    };

    const time = formatDate(props.lastMessage?.time);
    return (
        <div className='room-entry' onClick={handleClick} onContextMenu={handleRightClick}>
           <div className="room-entry-header">
                <h3>{props.roomName}</h3>
                <p>{time}</p>
            </div>
            { props.lastMessage ? (
                <p>{props.lastMessage.sender}: {props.lastMessage.content}</p>
            ) : (
                <p>No message yet.</p>
            )}
        </div>
    )
}

