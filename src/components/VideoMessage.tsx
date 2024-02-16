import { useEffect, useRef, useState } from "react";
import { Message } from "../interfaces/message.interface";

export default function VideoMessage({ mensagem }: { mensagem: Message }) {

    const refImage = useRef<HTMLImageElement>(null)

    const [src, setSrc] = useState<string>("")

    if (mensagem.type !== "video") return


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
            {
                src &&
                <video width="640" height="360"

                    controls
                    className="w-80"
                >
                    <source src={src} type="video/mp4"></source>

                </video>

            }

        </div>


    )
}
