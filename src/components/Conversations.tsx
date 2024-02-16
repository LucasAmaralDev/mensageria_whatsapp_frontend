import { useEffect } from "react"
import { socket } from "../socket"
import { chatListStore, chatStore } from "../store/example.store"
import CardChat from "./CardChat"

export default function Chats() {

    const { chatList } = chatListStore((state: any) => ({ chatList: state.chatList, setChatList: state.setChatList }))

    const { chat } = chatStore((state: any) => ({ chats: state.chats, setChat: state.setChat, chat: state.chat }))



    useEffect(() => {
        if (chat.id) {
            socket.emit("getChatMessages", chat.id._serialized)
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
                    chatList.map((chatUser: any, index: number) => {

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
