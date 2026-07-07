import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"
import ConfigUserManagement from "./pages/configuration/configUserManagement/UserManagementPage"
import  ProtectedRoute from "./components/ProtectedRoute"


const App= () => {

  return (
    <Router basename="/">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          
          {/* Protected Routes */}
            <Route element={<ProtectedRoute/>}>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/configUserManagement" element={<ConfigUserManagement />}></Route>
              
            </Route>
        </Routes>
    </Router>  
    
  );
};

export default App
