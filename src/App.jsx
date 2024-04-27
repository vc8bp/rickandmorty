import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/NavBar/NavBar'
import { useSearchParams } from 'react-router-dom'
import Home from './pages/home/Home'

function App() {
  const [searchParams, setSearchParams] =  useSearchParams()
  const activeTab = useMemo(() => searchParams.get("tab"), [searchParams])

  return (
    <>
      <Navbar activeTab={activeTab} />
      <Home setSearchParams={setSearchParams} activeTab={activeTab}/>
    </>
  )
}

export default App
