import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateButton from './components/CreateButton';
import CreatedPage from './components/CreatedPage';
import History from './components/History';

function App() {
  // need to change when merging with backend
  
  /*
    button for creating a bucket
  */
  // const url = window.location.origin.toString();

  return (
    <Router>
      <h1>RequestBucket</h1>
      <Routes>
        <Route path="/" element={<CreateButton />}/>
        <Route path="/create/:bucketUrl" element={<CreatedPage />}/>
        <Route path="/history/:bucketUrl" element={<History />}/>
      </Routes>
    </Router>
  )
}

export default App;
