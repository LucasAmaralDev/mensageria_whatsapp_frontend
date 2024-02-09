import { Message } from "../interfaces/message.interface"
import { userStore } from "../store/example.store"
import ImageMessage from "./ImageMessage"

export default function TextMessage({ mensagem }: { mensagem: Message }) {


    const { contacts, user } = userStore((state: any) => ({ contacts: state.contacts, user: state.user }))
    const userSerialized = mensagem.author ? mensagem.author : mensagem.from
    const userName = contacts[userSerialized] ? contacts[userSerialized] : userSerialized
    const me = mensagem.fromMe


    if (me)
        return (
            <div className={"col-start-6 col-end-13 p-3 rounded-lg"} >
                <div className="flex flex-row items-center justify-end">
                    <div
                        className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                        <span className="text-xs font-bold text-indigo-500 absolute -top-5 right-2 text-nowrap"
                        >{user.pushname}</span>
                        <div
                            className="w-full flex justify-center"
                        >
                            {
                                mensagem.type === "image" &&
                                <ImageMessage mensagem={mensagem} />
                            }
                        </div>
                        <div>{mensagem.body}</div>
                        <button
                            onClick={() => console.log(mensagem)}
                            className="text-xs font-bold text-indigo-500"
                        >log object</button>

                    </div>
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >
                        {
                            user.urlImage ? <img
                                src={user.urlImage}
                                alt="Avatar"
                                className="h-full w-full rounded-full"
                            /> : user.pushname.charAt(0)
                        }
                    </div>
                </div>
            </div>
        )

    return (
        <div className={"col-start-1 col-end-8 p-3 rounded-lg"}>
            <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >
                    {userName.charAt(0)}
                </div>
                <div
                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                >
                    <span className="text-xs font-bold text-indigo-500 absolute -top-5 left-2 text-nowrap"
                    >{userName}</span>
                    <div>{
                        mensagem.body.length > 0
                            ? mensagem.body
                            : mensagem.type === "image" ? "imagem" : mensagem.type === "ptt" ? "audio" : mensagem.type === "video" ? "video" : mensagem.type === "sticker" ? "(Figurinha #AbraNoCelular)" : mensagem.type === "document" ? "documento" : mensagem.type === "location" ? "localização" : mensagem.type === "vcard" ? "contato" : mensagem.type === "chat" ? "chat" : mensagem.type === "revoked" ? "mensagem apagada" : "mensagem"
                    }</div>
                    <button
                        onClick={() => console.log(mensagem)}
                        className="text-xs font-bold text-indigo-500"
                    >log object</button>
                    {
                        mensagem.type == "sticker" && <button
                            onClick={() => {
                                const dataObjeto = JSON.stringify(mensagem)
                                const blob = new Blob([dataObjeto], { type: 'application/json' })
                                const url = URL.createObjectURL(blob)
                                const a = document.createElement('a')
                                a.href = url
                                a.download = `${mensagem.id}.json`

                            }}
                        >Baixar Objeto como JSON</button>
                    }
                </div>
            </div>
        </div>
    )
}
