import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Wrapper from "./components/Wrapper.tsx";
import Login from "./pages/Login.tsx";
import Cars from "./pages/Cars.tsx";
import CarAdd from "./pages/CarAdd.tsx";


function App() {

  return (
      <>
          <Wrapper>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cars" element={<Cars />} />
                  <Route path="/carAdd" element={<CarAdd />} />
              </Routes>
          </Wrapper>
      </>
  )
}

export default App
