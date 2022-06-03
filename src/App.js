import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateButton from './components/CreateButton';
import CreatedPage from './components/CreatedPage';
import History from './components/History';
import bucket from './images/bucket.png'

function App() {
  return (
    <Router>
      <img src={bucket} alt="cartoon bucket"></img>
      <Link to="/"><h1>RequestBucket</h1></Link>
      <Routes>
        <Route path="/" element={<CreateButton />}/>
        <Route path="/create/:bucketUrl" element={<CreatedPage />}/>
        <Route path="/history/:bucketUrl" element={<History />}/>
      </Routes>
      <footer>
        <a href="https://www.vecteezy.com/free-vector/cartoon">Cartoon Vectors by Vecteezy</a>
      </footer>
    </Router>
  )
}

export default App;
