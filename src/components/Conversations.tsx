import { useEffect } from "react"
import { chatStore, userStore } from "../store/example.store"
import CardChat from "./CardChat"

export default function Chats() {

    const { chats, chat } = chatStore((state: any) => ({ chats: state.chats, setChat: state.setChat, chat: state.chat }))
    const { getChatMessages } = chatStore((state: any) => ({ getChatMessages: state.getChatMessages }))
    const { user } = userStore((state: any) => ({ user: state.user }))
    const { getChats } = chatStore((state: any) => ({ chats: state.chats, setChats: state.setChats, getChats: state.getChats }))
    const { contacts, setContacts } = userStore((state: any) => ({ contacts: state.contacts, setContacts: state.setContacts }))



    const getContacts = async () => {
        if (Object.keys(contacts).length > 0) return
        const contactsData = {} as any
        const response = await fetch("http://localhost:3003/getContacts")
        const data = await response.json()

        for (const contact of data) {
            contactsData[`${contact.id._serialized}`] = contact.name
        }
        contactsData[`${user.me._serialized}`] = "eu"
        setContacts(contactsData)

    }

    useEffect(() => {
        if (user.me?._serialized) {
            getChats()
            getContacts()
        }
    }, [user])

    useEffect(() => {
        if (chat.id) {
            getChatMessages()
        }
    }, [chat])



    return (
        <div className="flex flex-col mt-8 w-full h-4/6">
            <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Conversas Ativas</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full" > 4 </span >
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">

                {
                    chats.map((chatUser: any, index: number) => {

                        return (
                            <div key={index}>
                                <CardChat chatUser={chatUser} index={index} />

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
