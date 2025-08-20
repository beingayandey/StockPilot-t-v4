import React from 'react'
import './App.css'
import Layout from './layout/Layout'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>

        <Layout />

      </BrowserRouter>

    </>
  )
}

export default App