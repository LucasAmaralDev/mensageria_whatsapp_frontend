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
        if (user.wid?._serialized && user.urlImage) return
        const urlImage = await getUrlImage(user.wid._serialized)
        user.urlImage = urlImage
        setUser(user)
        getChats()
    }


    useEffect(() => {

        if (user.me?._serialized && !user.urlImage) {
            setTimeout(() => {
                getUserData()
            }, 1000)
        }

    }, [user])





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
