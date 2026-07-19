import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLoginPage from "./pages/StudentLoginPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentLoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
