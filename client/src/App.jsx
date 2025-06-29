import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/Home.jsx';
import Signup from './routes/Signup.jsx';
import Signin from './routes/Signin.jsx';
import Navbar from './components/Navbar.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
          <main className='min-h-screen'>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/signin" element={<Signin/>}/>
            </Routes>
          </main>
      </BrowserRouter>
    </>
  )
}

export default App