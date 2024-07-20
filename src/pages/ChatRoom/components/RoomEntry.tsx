interface RoomEntryProps {
    name: string;
    roomID: number;
    recentUser: string;
    recentMessage: string;
    time: string;
}
export default function RoomEntry ( props: RoomEntryProps ) {
    return (
        <div className='room-entry'>
            <div className="room-entry-header">
                <h3>{props.name}</h3>
                <p> {props.time}</p>
            </div>
            <p>{props.recentUser}: {props.recentMessage}</p>
        </div>
    )
}
