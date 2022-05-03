import "./App.css";
import {Routes, Route} from "react-router-dom"
import { HomePage, LandingPage,ErrorPage, LoginPage } from "./pages/index"
import { NavBar } from "./components/NavBar/NavBar";


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
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/loginpage" element={<LoginPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
