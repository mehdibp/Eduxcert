import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentPortal from "./pages/student/StudentPortal";
import EducatorConsolePage from "./pages/EducatorConsole";
import PublicVerifierPage  from "./pages/PublicVerifier";
import AdminConsolePage    from "./pages/AdminConsole";
import EmployerPage        from "./pages/EmployerPortal";
import SharedPages         from "./pages/SharedPages";

import Test from "./test";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<StudentLoginPage />} /> */}
        <Route path="/student"  element={<StudentPortal />} />
        <Route path="/educator" element={<EducatorConsolePage />} />
        <Route path="/verify"   element={<PublicVerifierPage />} />
        <Route path="/admin"    element={<AdminConsolePage />} />
        <Route path="/employer" element={<EmployerPage />} />
        <Route path="/account"  element={<SharedPages />} />

        <Route path="/test" element={<Test/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
