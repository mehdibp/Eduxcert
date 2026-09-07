import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentPortal  from "./pages/student/StudentPortal";
import EducatorPortal from "./pages/educator/EducatorPortal";
import AdminPortal    from "./pages/admin/AdminPortal";
import EmployerPortal from "./pages/employer/EmployerPortal";
import PublicVerifierPage  from "./pages/PublicVerifier";
import SharedPages         from "./pages/SharedPages";

import Test from "./test";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<StudentLoginPage />} /> */}
        <Route path="/student"  element={<StudentPortal />} />
        <Route path="/educator" element={<EducatorPortal />} />
        <Route path="/admin"    element={<AdminPortal />} />
        <Route path="/employer" element={<EmployerPortal />} />
        <Route path="/verify"   element={<PublicVerifierPage />} />
        <Route path="/account"  element={<SharedPages />} />

        <Route path="/test" element={<Test/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
