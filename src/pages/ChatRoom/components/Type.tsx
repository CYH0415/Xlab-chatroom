export interface Message {
    messageId: number;
    roomId: number;
    sender: string;
    content: string;
    time: number;
}

export interface RoomPreviewInfo {
    roomId: number;
    roomName: string;
    lastMessage: Message | null;
}

export interface Response<T> {
    message: string;
    code: number;
    data: T;
}

export interface RoomAddArgs{
    user: string;
    roomName: string;
}

export interface RoomAddRes {
    roomID: number;
}

export interface RoomListRes{
    rooms: RoomPreviewInfo[];
}

export interface RoomDeleteArgs {
    user: string;
    roomID: number;
}

export interface MessageAddArgs {
    roomID: number;
    content: string;
    sender: string;
}

export interface RoomMessageListArgs {
    roomID: number;
}

export interface RoomMessageListRes {
    messages: Message[];
}

export interface RoomMessageGetUpdateArgs {
    roomID: number;
    sinceMessageId: number;
}

export interface RoomMessageGetUpdateRes {
    messages: Message[];
}