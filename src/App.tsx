import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";


function App() {

  return (
      <>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
          </Routes>
      </>
  )
}

export default App
