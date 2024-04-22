import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ToDoPage from './pages/ToDoPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path=':id' element={<ToDoPage />} />
      </Routes>
    </Router>
  )
}

export default App
