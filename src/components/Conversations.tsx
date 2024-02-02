import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export default function Conversations() {

    const { chats, setChat } = useContext(UserContext)


    return (
        <div className="flex flex-col mt-8 h-4/6">
            <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Conversas Ativas</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full" > 4 </span >
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">

                {
                    chats.map((chatUser:any, index:number) => (
                        <button
                            key={index}
                            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                            onClick={() => {
                                setChat(chatUser)
                                console.log(chatUser)
                            }}
                        >
                            <div
                                className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                            >
                                {(chatUser.username as string).charAt(0)}
                            </div>
                            <div className="ml-2 text-sm font-semibold">{chatUser.username}</div>
                        </button>
                    ))
                }
                
            </div>
        </div>
    )
}
