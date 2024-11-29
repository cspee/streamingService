import { Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies";
import NavBar from "./components/NavBar";
import OneMovie from "./pages/OneMovie";
function App() {
  return (
    <>
      <div className="container">
        <header className="container-header">
          <NavBar />
        </header>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/oneMovie/:id" element={<OneMovie />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
