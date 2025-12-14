import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./css/App.css";

function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
