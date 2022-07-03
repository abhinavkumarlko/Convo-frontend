import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Chat />} path="chatpage" />
          <Route element={<NotFound />} path="404" />

          <Route exact element={<Navigate to="/chatpage" />} path="/" />
          <Route exact element={<Navigate to="/404" />} path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
