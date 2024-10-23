import { Routes , Route } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Test from "./Pages/test"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default App
