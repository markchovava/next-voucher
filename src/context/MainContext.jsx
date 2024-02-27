"use client"
import React, { createContext, useContext, useState } from 'react'


export const MainContext = createContext()

export default function MainContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    

    return (
        <MainContext.Provider value={{ 
            loading, 
            setLoading
        }}>
            { children }
        </MainContext.Provider>
      )
}


export const MainContextState = () => {
    return useContext(MainContext)
}