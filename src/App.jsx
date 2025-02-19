import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignIn from "./Auth/SignIn.jsx";
import SignUp from "./Auth/SignUp.jsx";
import LiveLtp from "./pages/LiveLtp.jsx";
import LayoutPage from "./pages/LayoutPage.jsx";
import ChartPage from "./pages/ChartPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/layout" element={<LayoutPage />} />
      <Route path="/live-ltp" element={<LiveLtp />} />
      <Route path="/chartpage" element={<ChartPage />} />
    </Routes>
  );
}

export default App;
