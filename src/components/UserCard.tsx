import { useEffect } from "react"
import { chatStore, userStore } from "../store/example.store"

export default function UserCard() {


    const { user, setUser } = userStore((state: any) => ({ user: state.user, setUser: state.setUser }))
    const { getChats } = chatStore((state: any) => ({ chats: state.chats, setChats: state.setChats, getChats: state.getChats }))

    const getUrlImage = async (id: string) => {
        const response = await fetch(`http://localhost:3003/profilePhoto/${id}`)
        const urlImage = await response.json()
        return urlImage
    }

    const getUserData = async () => {
        if (user.me?._serialized) return
        const response = await fetch("http://localhost:3003/me/info")
        const data = await response.json()
        console.log(data)
        const urlImage = await getUrlImage(data.wid._serialized)
        data.urlImage = urlImage
        setUser(data)
        getChats()
    }


    useEffect(() => {
        let interval: any

        interval = setInterval(() => {
            if (user.me?._serialized) getUserData()
        }, 10000)

        return () => clearInterval(interval)

    }, [])

    useEffect(() => {
        getUserData()
    }, [])



    return (
        <div
            className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
        >
            <div className="h-20 w-20 rounded-full border overflow-hidden">

                {
                    user.urlImage &&
                    <img
                        src={user.urlImage}
                        alt="Avatar"
                        className="h-full w-full"
                    />
                }

            </div>
            <div className="text-sm font-semibold mt-2">{user.pushname}</div>

        </div>
    )
}
