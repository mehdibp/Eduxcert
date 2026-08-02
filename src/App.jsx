import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentLoginPage from "./pages/StudentLoginPage";
import StudentPage from "./pages/StudentPage";
import EducatorConsolePage from "./pages/EducatorConsole";
import PublicVerifierPage  from "./pages/PublicVerifier";
import AdminConsolePage    from "./pages/AdminConsole";
import EmployerPage        from "./pages/EmployerPortal";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentLoginPage />} />
        <Route path="/student"  element={<StudentPage />} />
        <Route path="/educator" element={<EducatorConsolePage />} />
        <Route path="/verify"   element={<PublicVerifierPage />} />
        <Route path="/admin"    element={<AdminConsolePage />} />
        <Route path="/employer" element={<EmployerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
