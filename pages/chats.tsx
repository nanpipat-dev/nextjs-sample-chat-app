import style from '../styles/auth.module.scss'
import chatStyle from '../styles/chats.module.scss'

import { useRouter } from 'next/router'

import dynamic from 'next/dynamic';
import { useGlobal } from '../context';
import { useEffect, useState } from 'react';
import { ChatEngine,MessageFormSocial } from 'react-chat-engine'

// const ChatEngine = dynamic<Function>(() =>
//     import("react-chat-engine").then((module) => module.ChatEngine)
// );

// const MessageFormSocial = dynamic<Function>(() =>
//     import("react-chat-engine").then((module) => module.MessageFormSocial)
// )

function Chats(): JSX.Element {
    const { username, secret } = useGlobal()
    const [showChat, setShowChat] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (typeof document !== null) {
            setShowChat(true)
        }
    })

    useEffect(() => {
        if(username.length === 0) router.push('/')
    })

    return (
        <>
            {!showChat
                ?
                <div></div>
                :
                <div className="background">
                    <div className="shadow">
                        <ChatEngine
                        height="calc(100vh - 200px)"
                            publicKey='c85cc042-0adc-42a7-babd-b362ccb622e3'
                            userName={username}
                            userSecret={secret}
                            renderNewMessageForm={() => <MessageFormSocial/>}
                        />
                    </div>
                </div>}
        </>
    )
}

export default Chats