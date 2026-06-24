import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react'

type DashboardPreferencesContextValue = {
  pollingInterval: number
  setPollingInterval: (value: number) => void
}

const DashboardPreferencesContext =
  createContext<DashboardPreferencesContextValue | null>(null)

const DashboardPreferencesProvider = ({ children }: PropsWithChildren) => {
  const [pollingInterval, setPollingInterval] = useState(4000)

  return (
    <DashboardPreferencesContext.Provider
      value={{ pollingInterval, setPollingInterval }}
    >
      {children}
    </DashboardPreferencesContext.Provider>
  )
}

export const useDashboardPreferences = () => {
  const context = useContext(DashboardPreferencesContext)

  if (!context) {
    throw new Error(
      'useDashboardPreferences must be used within DashboardPreferencesProvider'
    )
  }

  return context
}

export default DashboardPreferencesProvider
