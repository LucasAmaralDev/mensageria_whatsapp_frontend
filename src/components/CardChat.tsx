import React from 'react'
import { chatStore, userStore } from '../store/example.store'

export default function CardChat({ index, chatUser }: any) {

    if (!chatUser.id) return


    const [imagemUrl, setImagemUrl] = React.useState("")
    const { setChat } = chatStore((state: any) => ({ chats: state.chats, setChat: state.setChat, chat: state.chat }))
    const { contacts } = userStore((state: any) => ({ contacts: state.contacts, setContacts: state.setContacts }))
    const horarioUltimaMensagem = new Date(chatUser.lastMessage.timestamp * 1000).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

    const autorLastMessage = chatUser.lastMessage.author ? chatUser.lastMessage.author : chatUser.lastMessage.from
    const username = contacts[autorLastMessage] ? contacts[autorLastMessage] : autorLastMessage



    const getUrlImage = async (id: string) => {
        const response = await fetch(`http://localhost:3003/profilePhoto/${id}`)
        const urlImage = await response.json()
        return urlImage
    }

    React.useEffect(() => {
        getUrlImage(chatUser.id._serialized).then((url: any) => {
            setImagemUrl(url)
        })
    }, [])

    return <div>
        <button
            key={index}
            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 w-full"
            onClick={() => {
                setChat(chatUser)
                console.log(chatUser)
            }}
        >

            {/* IMAGEM OU LETRA CAPITULAR DO NOME DO CHAT */}
            <div className={"flex items-center justify-center w-10 "}>
                {
                    imagemUrl ?
                        <img
                            src={imagemUrl}
                            alt="Avatar"
                            className="h-full w-full rounded-full"
                        />
                        : <div
                            className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold"
                        >
                            {(chatUser.name as string).charAt(0)}
                        </div>
                }
            </div>

            {/* NOME E ULTIMA MENSAGEM */}
            <div className="flex flex-col ml-2 w-9/12 jus">
                <span className="font-semibold w-full  text-left text-nowrap text">{chatUser.name.slice(0, 20)}</span>
                <span
                    className={`text-xs ${chatUser.unreadCount > 0 ? "text-red-500 font-bold " : "text-gray-500"} w-full text-left `}
                >
                    {`${username}: ${chatUser.lastMessage.body.slice(0, 26)}`}</span>
            </div>

            {/* HORA DA ULTIMA MENSAGEM */}
            <div className="flex flex-col items-end w-2/12">
                <span className="text-xs text-gray-500">{horarioUltimaMensagem}</span>
                {
                    chatUser.unreadCount > 0 &&
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {chatUser.unreadCount}
                    </span>
                }
            </div>
        </button>
    </div>
}
