import type { Response } from '../pages/ChatRoom/components/Type'

const prefix = "https://chatroom.zjuxlab.com"

export async function getFetcher( key: string ) {
    const res = (
        await fetch(prefix + key, {mode: "cors"})
        .then((res) => res.json())
    ) as Response<any>;
    

    if (res.code === 0) {
        return res.data;
    } else {
        throw new Error(res.message + " " + res.code);
    }
}

export async function postFetcher( 
    key: string, 
    body: { arg: Record<string, unknown> | Array<unknown> } ) {
    const res = (
        await fetch(prefix + key, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body.arg),
        })
        .then((res) => res.json())
    ) as Response<any>;

    if (res.code === 0) {
        return res.data;
    } else {
        throw new Error(res.message + " " + res.code);
    }
}

export function formatDate(timestamp: number | undefined ): string {
    if (timestamp === undefined) {
        return '';
    }
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