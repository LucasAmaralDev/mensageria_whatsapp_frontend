// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { create } from 'zustand'




export const userStore = create((set) => ({
    user: {} as any,
    contacts: {} as any,
    setUser: (user: any) => { set({ user }) },
    setContacts: (contacts: any) => set({ contacts }),
}))

export const chatStore = create((set) => ({
    chats: [] as any,
    chat: {} as any,
    chatMessages: [] as any,
    setChats: (chats: any) => { set({ chats }) },
    setChat: (chat: any) => { set({ chat }) },
    setChatMessages: (chatMessages: any) => { set({ chatMessages }) },
    getChatMessages: () => set(async (state: any) => {
        if (!state.chat.id) return
        const response = await fetch(`http://localhost:3003/chats/${state.chat.id._serialized}/messages`)
        const data = await response.json()

        if (state.chatMessages.length == 0 || state.chatMessages !== data) {

            state.setChatMessages(data)
        }

        else {
            return
        }
    }),
    getChats: () => set(async (state: any) => {
        const response = await fetch("http://localhost:3003/chats")
        const data = await response.json()
        const responseChatsData = []

        for (const chatsdat of data) {
            responseChatsData.push(chatsdat)
        }

        if (state.chats.length == 0 || state.chats !== responseChatsData) {
            console.log(state.chats, responseChatsData)
            state.setChats(responseChatsData)
        }
    })
}))

