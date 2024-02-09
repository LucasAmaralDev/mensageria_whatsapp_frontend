import { useEffect, useRef, useState } from "react";
import { Message } from "../interfaces/message.interface";

export default function ImageMessage({ mensagem }: { mensagem: Message }) {

    const refImage = useRef<HTMLImageElement>(null)

    const [src, setSrc] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)

    if (mensagem.type !== "image") return



    const baixarImagem = async () => {
        const id_serialized = mensagem._data.id._serialized
        const response = await fetch(`http://localhost:3003/message/donwloadMedia/${id_serialized}`)
        const data = await response.json()
        console.log(data)
        // { mimetype: "image/jpeg" , data: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYGBgYHBgcICAcKCw…t63L0uXrety9Ll63rety9b1vW...', filesize: 89867}
        setSrc(`data:${data.mimetype};base64,${data.data}`)
    }

    useEffect(() => {
        baixarImagem()
    }, [])

    return (
        <div
            ref={refImage}
        >
            <img
                src={src}
                alt="imagem"
                className="h-40 rounded-md"
                onClick={() => setOpenModal(true)}
            />

            {/* modal para imagem em tela grande */}
            <div
                className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50 ${openModal ? "block" : "hidden"}`}
            >
                <div
                    className="bg-white p-4 rounded-lg h-5/6 flex flex-col "
                >
                    <img
                        src={src}
                        alt="imagem"
                        className="h-full"
                    />
                    <button
                        onClick={() => setOpenModal(false)}
                        className="bg-red-500 text-white p-2 rounded-lg mt-4"
                    >Fechar</button>
                </div>
            </div>

        </div>


    )
}
