import './ChatRoom.css'
import useSWR from 'swr'
import MessageItem from './components/MessageItem'
import RoomEntry from './components/RoomEntry'
import type * as type from './components/Type'
import { useState } from 'react'
import { getFetcher } from '../../utils/utils'

const testMessage: type.Message = {
    messageId: 1,
    roomId: 1,
    sender: "CYH",
    content: "Hello, this is a test message.",
    time: Date.now(),
}

const longMessage: type.Message = {
    messageId: 2,
    roomId: 1,
    sender: "CYH",
    content: "The CSS anchor positioning module defines features that allow you to tether elements together. Certain elements are defined as anchor elements; anchor-positioned elements can then have their size and position set based on the size and location of the anchor elements to which they are bound.",
    time: Date.now(),
}

export default function ChatRoom () {
    const [roomId, setRoomId] = useState<number | null>(null);
    const [roomName, setRoomName] = useState<string | null>(null);

    const handleRoomSelect = (selectedRoomID: number, selectedRoomName: string) => {
        console.log("Entering room " + selectedRoomID);
        setRoomId(selectedRoomID);
        setRoomName(selectedRoomName);
    };

    const { // fetch room list data
        data: roomData,
        error: roomError,
        isLoading: roomIsLoading,
    } = useSWR<type.RoomListRes>('/api/room/list', getFetcher, {
        refreshInterval: 1000,
    });

    const { // fetch message list data
        data: messageListData,
        error: messageListError,
        isLoading: messageListIsLoading,
    } = useSWR<type.RoomMessageListRes>(
        () => {
            if (roomId === null) return false;
            return `/api/room/message/list?roomId=${roomId}`
        }, getFetcher, { refreshInterval: 1000 }
    )

    return (
        <div className='chat-room'>
            <aside className='room-list'>
                <nav className='operate'>
                    <h1>Welcom, CYH!</h1>
                    <button className='create-room-button'></button>
                </nav>
                {roomData?.rooms.map(room => (
                    <RoomEntry
                        roomId={room.roomId}
                        roomName={room.roomName || "Unnamed Room"}
                        lastMessage={room.lastMessage}
                        onRoomSelect={handleRoomSelect}
                    />
                ))}
            </aside>
            <div className='room-body'>
                <div className='room-header'>
                    <h1>{roomName || "Enter a room to start."}</h1>
                </div>
                <div className='message-area'>
                    {messageListData?.messages.map(message => (
                        <MessageItem message={message} />
                    ))}
                </div>
                <div className='input-area'>
                    <textarea placeholder='Start texting...' />
                    <button>Send</button>
                </div>                
            </div>
        </div>
    )
}

