import './ChatRoom.css'
import MessageItem from './components/MessageItem'
import RoomEntry from './components/RoomEntry'

export default function ChatRoom () {
    return (
        <div className='chat-room'>
            <aside className='room-list'>
                <nav className='operate'>
                    <h1>Welcom, CYH!</h1>
                    <button className='create-room-button'></button>
                </nav>
                <RoomEntry name="Room 1" time = "13:03" recentUser="User 1" recentMessage="Short message." roomID={1}/>
                <RoomEntry name="Room 2" time = "13:03" recentUser="User 2" recentMessage="Message long enough to break the block" roomID={1}/>
                <RoomEntry name="zombie room" time = "11:45" recentUser="zombie" recentMessage="zombie message" roomID={1}/>
                <RoomEntry name="zombie room" time = "11:45" recentUser="zombie" recentMessage="zombie message" roomID={1}/>
                <RoomEntry name="zombie room" time = "11:45" recentUser="zombie" recentMessage="zombie message" roomID={1}/>
                <RoomEntry name="zombie room" time = "11:45" recentUser="zombie" recentMessage="zombie message" roomID={1}/>
                <RoomEntry name="zombie room" time = "11:45" recentUser="zombie" recentMessage="zombie message" roomID={1}/>
                <RoomEntry name="zombie room" time = "11:45" recentUser="zombie" recentMessage="zombie message" roomID={1}/>
            </aside>
            <div className='room-body'>
                <div className='room-header'>
                    <h1>Room 1</h1>
                </div>
                <div className='message-area'>
                    <MessageItem user="User 1" message="Short message." />
                    <MessageItem user="User 2" message="Another way of adding styles to your application is to use CSS Modules.
CSS Modules are convenient for components that are placed in separate files.
The CSS inside a module is available only for the component that imported it, and you do not have to worry about name conflicts.
Create the CSS module with the .module.css extension, example: mystyle.module.css." />
                    <MessageItem user="zombie" message="zombie message." />
                    <MessageItem user="zombie" message="zombie message." />
                    <MessageItem user="zombie" message="zombie message." />
                    <MessageItem user="zombie" message="zombie message." />
                    <MessageItem user="zombie" message="zombie message." />
                    <MessageItem user="zombie" message="zombie message." />
                    <MessageItem user="zombie" message="zombie message." />
                </div>
                <div className='input-area'>
                    <textarea placeholder='Start texting...' />
                    <button>Send</button>
                </div>                
            </div>
        </div>
    )
}

