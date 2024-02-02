import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({} as any)

export const UserProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState({
        username: "WCOGEO",
        avatar: "https://wcogeo.com/assets/brand-write-icon-gMLJ53Yd.svg",
        usernumber: ""
    })

    const [chat, setChat] = useState({} as any)
    const [usersChat, setUsersChat] = useState({} as any)

    const [chats, setChats] = useState([] as any)

    const [chatMessages, setChatMessages] = useState<any[]>([])

    const getUserData = async () => {
        const response = await fetch("http://localhost:3003/me/info")
        
        const data = await response.json()
        setUser({ ...user, username: data.pushname, usernumber: data.me._serialized })

        getChats()
    }

    const getChats = async () => {
        const response = await fetch("http://localhost:3003/chats")
        const data = await response.json()
        const responseChats = []
        const responseUsers: any = {}
        for (const chats of data) {
            responseUsers[`${chats.id._serialized}`] = chats.name
            responseChats.push({ username: chats.name, usernumber: chats.id._serialized })
        }
        setUsersChat(responseUsers)
        setChats(responseChats)
    }

    const getChatMessages = async () => {
        const response = await fetch(`http://localhost:3003/chats/${chat.usernumber}/messages`)
        const data = await response.json()
        const responseChats = []

        for (const message of data) {
            responseChats.push({ user: message.from, mensagem: message.body })
        }

        setChatMessages(responseChats)

    }

    useEffect(() => {
        let ultimoIntervalo = setInterval(() => {
            getChatMessages()
        }, 700)

        return () => {
            clearInterval(ultimoIntervalo)
        }
    }, [chat])



    useEffect(() => {
        getUserData()

        
    }, [])

    useEffect(() => {
        setChatMessages([])
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser, chats, setChats, chatMessages, setChatMessages, chat, setChat, getChatMessages, usersChat }}>
            {children}
        </UserContext.Provider>
    )
}