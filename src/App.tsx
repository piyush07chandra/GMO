import './App.css'

import FirstPage from './components/FirstPage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SecondPage from './components/SecondPage';



const App: React.FC =()=>{
 
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
