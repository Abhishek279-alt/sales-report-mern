import "./App.css";
import BarChart from "./components/BarChart";
import CombinedStats from "./components/CombinedStats";
import Home from "./components/Home";
import PieChart from "./components/PieChart";
import Statistics from "./components/Statistics";
import Transactions from "./components/Transactions";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Home />
        <Routes>
          <Route path="/" element={<Transactions />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/bar-stats" element={<BarChart />} />
          <Route path="/pie-stats" element={<PieChart />} />
          <Route path="/combined-stats" element={<CombinedStats />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
