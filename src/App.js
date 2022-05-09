import "./App.css";
import {Routes, Route} from "react-router-dom"
import { HomePage, LandingPage,ErrorPage, LoginPage, LabelsPage, ArchivePage, LogoutPage, SignupPage, TrashPage } from "./pages/index"
import { NavBar } from "./components/NavBar/NavBar";
import {ProtectedRoute} from "./Routes/ProtectedRoute"
import Mockman from "mockman-js";

function MockAPI() {
  return (
    <div className="MockAPI">
      <Mockman />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/mockman" element={<MockAPI/>}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/homepage" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path="/labelspage" element={<ProtectedRoute><LabelsPage/></ProtectedRoute>}/>
        <Route path="/archivepage" element={<ProtectedRoute><ArchivePage/></ProtectedRoute>}/>
        <Route path="/trashpage" element={<ProtectedRoute><TrashPage/></ProtectedRoute>}/>
        <Route path="/loginpage" element={<LoginPage/>}/>
        <Route path="/logoutpage" element={<LogoutPage/>}/>
        <Route path="/signuppage" element={<SignupPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
