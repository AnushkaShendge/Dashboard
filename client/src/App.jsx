import { Routes , Route } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Dashboard from "./Pages/Dashboard"
import CallInfo from "./Pages/CallInfo"



function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/call/:id" element={<CallInfo />} />
    </Routes>
  )
}

export default App
