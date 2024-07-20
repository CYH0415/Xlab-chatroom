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
            body: JSON.stringify(body),
        })
        .then((res) => res.json())
    ) as Response<any>;

    if (res.code === 0) {
        return res.data;
    } else {
        throw new Error(res.message + " " + res.code);
    }
}