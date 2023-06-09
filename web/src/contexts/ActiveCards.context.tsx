import { createContext } from "react"

export const ActiveCardsContext = createContext<{count: number}>({count: 0})

export const ActiveCardsContextProvider = ActiveCardsContext.Provider