import {
  useState,
  useContext,
  createContext,
  ReactElement,
} from 'react'

type HeaderState = {
  opened: boolean
  toggleHeader: () => void
  closeHeader: () => void
}

export const HeaderContext = createContext<HeaderState>({
  opened: false,
} as HeaderState)

export function HeaderProvider({
  children,
}: {
  children: ReactElement | ReactElement[]
}): JSX.Element {
  const [opened, setOpened] = useState(false)

  const toggleHeader = () => {
    setOpened((prev) => !prev)
  }

  const closeHeader = () => {
    setOpened(false)
  }

  return (
    <HeaderContext.Provider value={{ opened, toggleHeader, closeHeader }}>
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeaderState(): HeaderState {
  const state = useContext(HeaderContext)

  if (state === undefined) {
    throw new Error('useHeaderState must be used within HeaderProvider')
  }

  return state
}
