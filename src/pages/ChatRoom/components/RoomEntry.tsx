interface RoomEntryProps {
    name: string;
    recentUser: string;
    recentMessage: string;
    time: string;
}
export default function RoomEntry ( props: RoomEntryProps ) {
    return (
        <div className='room-entry'>
            <h3>{props.name}</h3>
            <p> {props.time}</p>
            <p>{props.recentUser}: {props.recentMessage}</p>
        </div>
    )
}