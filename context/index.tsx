import React, {
    createContext,
    useState,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react'

type ContextType = {
    username: string,
    setUsername: Dispatch<SetStateAction<string>>
    secret: string,
    setSecret: Dispatch<SetStateAction<string>>
}

const globalContextType: ContextType = {
    username: "",
    setUsername: () => {},
    secret: "",
    setSecret: () => {},
  }

const Context = createContext(globalContextType)


export const ContextProvider:React.FC = ({children}) => {
    const [username, setUsername] = useState("")
    const [secret, setSecret] = useState("")

    const value:ContextType = {
        username,
        setUsername,
        secret,
        setSecret,
    };

    return(
        <Context.Provider value={value}>{children}</Context.Provider>
    )
}

export const useGlobal = (): ContextType => {
    const context = useContext(Context)
    if (!context) {
      throw new Error('Context errors')
    }
    return context
  }