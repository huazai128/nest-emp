import { createContext, useContext } from 'react'

const StoreContext = createContext<IStore>(null as any)

interface IProps {
    store: IStore
    children: React.ReactNode
}

const RootStoreProvider = ({ store, children }: IProps) => {
    return (
        <StoreContext.Provider value={{ ...store }}>
            {children}
        </StoreContext.Provider>
    )
}

const useRootStore = () => {
    return useContext(StoreContext)
}

export { RootStoreProvider, useRootStore, StoreContext }