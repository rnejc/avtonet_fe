import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Wrapper from "./components/Wrapper.tsx";
import Login from "./pages/Login.tsx";
import Cars from "./pages/Cars.tsx";
import CarAdd from "./pages/CarAdd.tsx";
import CarEdit from "./pages/CarEdit.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const location = useLocation();
    const noWrapperRoutes = ["/login", "/register"];

    return (
        <>
            {/* Only render Wrapper if the current path is not in noWrapperRoutes */}
            {!noWrapperRoutes.includes(location.pathname) ? (
                <Wrapper>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/cars" element={<Cars />} />
                        <Route path="/carAdd" element={<CarAdd />} />
                        <Route path="/carEdit/:id" element={<CarEdit />} />
                    </Routes>
                </Wrapper>
            ) : (
                // Directly render Login or Register without Wrapper
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            )}
        </>
    );
}

export default App;
