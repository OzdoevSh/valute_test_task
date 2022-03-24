import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainPage from './pages/MainPage';
import ValuteCardPage from './pages/ValuteCardPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/:valuteCard" element={<ValuteCardPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
