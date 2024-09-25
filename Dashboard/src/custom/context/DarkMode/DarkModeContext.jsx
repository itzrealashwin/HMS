import { createContext, useState } from "react"


const DarkModeContext = createContext()

const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState()
    return(
        <DarkModeContext.Provider value={{ darkMode: true }}>
            {children}
        </DarkModeContext.Provider>
    )
}
