import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SyntheticEvent } from 'react'
import { useGlobal } from '../context'
import style from '../styles/auth.module.scss'
import axios from 'axios'
import { useRouter } from 'next/router'

const Auth = () => {
  const { username, secret, setUsername, setSecret } = useGlobal()

  const router = useRouter()


  function onSubmit(e: SyntheticEvent): void {
    e.preventDefault()

    if (username.length === 0) return

    if(!validateEmail(username)) {
      alert("invalid email")
      return
    }

    setSecret("123456top123456")

    console.log(username, secret, "asdasd")

    axios.put(
      'https://api.chatengine.io/users/',
      { username, secret },
      { headers: {
        'PRIVATE-KEY' : 'bd15d56d-58fd-453f-9479-4a8ad53b2a44' 
      }}
      )
      .then(r => router.push('/chats'))

  }

  const validateEmail = (email:string) =>{
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">NextJS</div>

          <div className="input-container">
            <input placeholder='Email' className="text-input" onChange={e => setUsername(e.target.value)} />
          </div>

          <button type='submit' className="submit-button">
            Go to Chat!
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
