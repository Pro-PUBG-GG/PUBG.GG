import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from "./pages/Main"
import Info from "./pages/Info"
import PreferPage from "./pages/Prefer"
import SimulationPage from "./pages/Simulation"
import PatchPage from "./pages/Patch"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/info" element={<Info />} />
          <Route path="/sim" element={<SimulationPage />} />
          <Route path="prefer" element={<PreferPage />} />
          <Route path="patch" element={<PatchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
