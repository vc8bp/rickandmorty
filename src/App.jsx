import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/NavBar/NavBar'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import Home from './pages/home/Home'
import CharacterPage from './pages/CharectorPage/CharectorPage'
import EpisodesPage from './pages/EpisodesPage/EpisodesPage'
import LocationPage from './pages/LocationsPage/LocationPage'

function App() {
  const [searchParams, setSearchParams] =  useSearchParams()
  const activeTab = useMemo(() => searchParams.get("tab"), [searchParams])



  return (
    <>
      <Navbar activeTab={activeTab} />
      <Routes>
        <Route path='/' element={<Home setSearchParams={setSearchParams} activeTab={activeTab}/>}/>
        <Route path='/character/:id' element={<CharacterPage />}/>
        <Route path='/episode/:id' element={<EpisodesPage />}/>
        <Route path='/location/:id' element={<LocationPage />}/>
      </Routes>
    </>
  )
}

export default App
