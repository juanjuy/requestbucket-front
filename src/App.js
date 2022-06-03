import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateButton from './components/CreateButton';
import CreatedPage from './components/CreatedPage';
import History from './components/History';

function App() {
  return (
    <Router>
      <Link to="/"><h1>RequestBucket</h1></Link>
      <Routes>
        <Route path="/" element={<CreateButton />}/>
        <Route path="/create/:bucketUrl" element={<CreatedPage />}/>
        <Route path="/history/:bucketUrl" element={<History />}/>
      </Routes>
    </Router>
  )
}

export default App;
