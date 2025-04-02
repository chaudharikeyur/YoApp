import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import "./App.css";

function App() {
  return (
      <div className="App">
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      </div>
   
  );
}

export default App;
