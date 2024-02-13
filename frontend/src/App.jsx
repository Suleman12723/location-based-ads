import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import PostAd from "./Pages/PostAd";

function App() {
  return (
    <div className="flex overflow-hidden w-full h-full bg-primary">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-ad" element={<PostAd />} />
      </Routes>
    </div>
  );
}

export default App;
