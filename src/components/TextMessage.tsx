import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export default function TextMessage({ username, message, me }: { username: string, message: string, me: boolean }) {

    const { usersChat, user } = useContext(UserContext)

    if (me)
        return (
            <div className={"col-start-6 col-end-13 p-3 rounded-lg"} >
                <div className="flex flex-row items-center justify-end">
                    <div
                        className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                        <span className="text-xs font-bold text-indigo-500 absolute -top-5 right-2 text-nowrap"
                        >{user.username}</span>
                        <div>{message}</div>
                    </div>
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >
                        {username.charAt(0)}
                    </div>
                </div>
            </div>
        )

    return (
        <div className={"col-start-1 col-end-8 p-3 rounded-lg"}>
            <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >
                    {username.charAt(0)}
                </div>
                <div
                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                >
                    <span className="text-xs font-bold text-indigo-500 absolute -top-5 left-2 text-nowrap"
                    >{usersChat[username]}</span>
                    <div>{message}</div>
                </div>
            </div>
        </div>
    )
}
