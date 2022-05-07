import "./App.css";
import {Routes, Route} from "react-router-dom"
import { HomePage, LandingPage,ErrorPage, LoginPage, LabelsPage, ArchivePage } from "./pages/index"
import { NavBar } from "./components/NavBar/NavBar";
import Mockman from "mockman-js";
import { AsideBar } from "./components/Aside/AsideBar";

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
      <AsideBar/>
      <Routes>
        <Route path="/mockman" element={<MockAPI/>}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/labelspage" element={<LabelsPage/>}/>
        <Route path="/archivepage" element={<ArchivePage/>}/>
        <Route path="/loginpage" element={<LoginPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
