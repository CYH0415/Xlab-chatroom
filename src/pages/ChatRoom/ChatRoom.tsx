import './ChatRoom.css'
import useSWR from 'swr'
import MessageItem from './components/MessageItem'
import RoomEntry from './components/RoomEntry'
import type * as type from './components/Type'
import { useState } from 'react'
import { getFetcher, postFetcher } from '../../utils/utils'
import useSWRMutation from 'swr/mutation'

export default function ChatRoom () {
    const [roomId, setRoomId] = useState<number | null>(Number(localStorage.getItem('lastVisitedRoomId')));
    const [roomName, setRoomName] = useState<string | null>(localStorage.getItem('lastVisitedRoomName'));

    const handleRoomSelect = (selectedRoomID: number, selectedRoomName: string) => {
        console.log("Entering room " + selectedRoomID);
        setRoomId(selectedRoomID);
        setRoomName(selectedRoomName);
        localStorage.setItem('lastVisitedRoomId', selectedRoomID.toString());
        localStorage.setItem('lastVisitedRoomName', selectedRoomName);
    };

    const { // fetch room list data
        data: roomData
    } = useSWR<type.RoomListRes>('/api/room/list', getFetcher, {
        refreshInterval: 1000,
    });

    const { // fetch message list data
        data: messageListData,
    } = useSWR<type.RoomMessageListRes>(
        () => {
            if (roomId === null) return false;
            return `/api/room/message/list?roomId=${roomId}`
        }, getFetcher, { refreshInterval: 1000 }
    )

    const {
        trigger: addRoomTrigger
    } = useSWRMutation<
        { roomId: number },
        Error,
        string,
        {
            user: string;
            roomName: string;
        }
    >("/api/room/add", postFetcher);

    async function addNewRoom () {
        const newRoomName = prompt("Enter the name for the new room:") || "New Room";
        const newId = await addRoomTrigger({
            user: "CYH",
            roomName: newRoomName,
        })
        console.log("Created room: " + newId.roomId);
    };

    const {
        trigger: addMessageTrigger
    } = useSWRMutation<
        null,
        Error,
        string,
        {
            roomId: number;
            content: string;
            sender: string;
        }
    >("/api/message/add", postFetcher);

    async function addNewMessage ( currentRoomId: number ) {
        let textarea = document.querySelector('.input-area textarea') as HTMLTextAreaElement;
        let messageContent = textarea?.value;
        if (textarea && messageContent) {
            await addMessageTrigger({
                roomId: currentRoomId,
                content: messageContent,
                sender: "CYH",
            });
            textarea.value = '';
        } else {
            console.error("Message content is empty or undefined.");
        }
    }

    

    return (
        <div className='chat-room'>
            <aside className='aside'>
                <nav className='operate'>
                    <h1>Welcom, CYH!</h1>
                    <button 
                        className='create-room-button' 
                        onClick={addNewRoom}></button>
                </nav>
                <div className='room-list'>
                    {roomData?.rooms
                    .sort((a, b) => {
                        const timeA = a.lastMessage?.time ?? 0;
                        const timeB = b.lastMessage?.time ?? 0;
                        
                        return timeB - timeA;
                    })
                    .map(room => (
                        <RoomEntry
                            roomId={room.roomId}
                            roomName={room.roomName || "Unnamed Room"}
                            lastMessage={room.lastMessage}
                            onRoomSelect={handleRoomSelect}
                        />
                    ))}
                </div>
                
            </aside>
            <div className='room-body'>
                <div className='room-header'>
                    <h1>{roomName || "Enter a room to start."}</h1>
                </div>
                <div className='message-area'>
                    {messageListData?.messages.map(message => (
                        <MessageItem message={message}/>
                    ))}
                </div>
                <div className='input-area'>
                    <textarea placeholder='Start texting...' />
                    {
                        roomId !== null && roomId !== undefined ? (
                            <button onClick={() => addNewMessage(roomId)}>Send</button>
                        ) : (
                            <button disabled>Send</button>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

