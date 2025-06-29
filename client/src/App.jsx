import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './routes/Home.jsx'
import Signup from './routes/Signup.jsx'
import Signin from './routes/Signin.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App