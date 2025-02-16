import { useState } from 'react'
import './App.css'
import AuthPage from './components/AuthPage'
import DashboardPage from './components/DashboardPage'
import FormPage from './components/FormPage'
import Game from './components/Game'

function App() {
  const [page, setPage] = useState<string>("auth")

  return (
    <>
    <ul>
      <li onClick={() => setPage("auth")}>Auth</li>
      <li onClick={() => setPage("form")}>Form</li>
      <li onClick={() => setPage("dashboard")}>Dashboard</li>
      <li onClick={() => setPage("game")}> Game</li>
    </ul>
      {page == "auth" && <AuthPage/>}
      {page == "form" && <FormPage/>}
      {page == "dashboard" && <DashboardPage/>}
      {page == "game" && <Game/>}

    </>
  )
}

export default App
