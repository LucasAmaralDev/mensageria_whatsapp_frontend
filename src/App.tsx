import { useEffect } from "react"
import ChatInput from "./components/ChatInput"
import Chats from "./components/Conversations"
import TextMessage from "./components/TextMessage"
import UserCard from "./components/UserCard"
import { Message } from "./interfaces/message.interface"
import { chatListStore, chatStore, userStore } from "./store/example.store"
import { socket } from "./socket"

export const socket_commands = {
  getMyInfo: "getMyInfo",
  getChats: "getChats",
  getContacts: "getContacts",
}

function App() {

  const { setUser } = userStore((state: any) => ({ setUser: state.setUser }))
  const { setContacts } = userStore((state: any) => ({ setContacts: state.setContacts }))
  const { setChatList } = chatListStore((state: any) => ({ setChatList: state.setChatList }))
  const { setChatMessages } = chatStore((state: any) => ({ setChatMessages: state.setChatMessages }))
  const { chat } = chatStore((state: any) => ({ chat: state.chat }))


  useEffect(() => {
    socket.emit(socket_commands.getMyInfo)
    socket.emit(socket_commands.getChats)
    socket.emit(socket_commands.getContacts)

    socket.on("getMyInfo", (data: any) => {
      setUser(data)
    })

    socket.on("getContacts", (data: any) => {
      setContacts(data)
      console.log("setando contatos")
    })

    socket.on("getChats", (data: any) => {
      if (chat.id && chat.id._serialized === data.id._serialized) {
        socket.emit("getChatMessages", data.id._serialized)
      }
      setChatList(data)
    })

    socket.on("getChatMessages", (data: any) => {
      setChatMessages(data)
    })

  }, [])






  const { chatMessages } = chatStore((state: any) => ({ chatMessages: state.chatMessages }))


  const mensagens = (chatMessages as Message[]).sort((a, b) => a.timestamp - b.timestamp)

  // const { getChatMessages } = chatStore((state: any) => ({ getChatMessages: state.getChatMessages }))
  // useEffect(() => {

  //   let interval: any
  //   if (chat.id) {
  //     interval = setInterval(() => {
  //       getChatMessages()
  //     }, 700)
  //   }

  //   return () => clearInterval(interval)

  // }, [chat])



  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-96 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div
                className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">Whatsapp Developer</div>
            </div>

            {/* User box */}
            <UserCard />
            <Chats />

          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div
              className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
            >
              {/* Chat body */}
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">

                    {/* Mensagem */}
                    {
                      mensagens.map((mensagem: Message, index) => {
                        return (<TextMessage mensagem={mensagem} key={mensagem.id?._serialized} />)

                      })
                    }

                    {/* Fim mensagem */}
                  </div>
                </div>
              </div>

              {/* Chat input */}
              <ChatInput />
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
