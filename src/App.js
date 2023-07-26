import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './components/StartPage';
import Sidebar from './components/sidebar';
import Homepage from './components/Homepage';
import Settings from './components/settings';
import MapComponent from './components/map';

function App() {
  return (
    <div className='App' >
      <Router basename="/Weather-App-REACT">
      <StartPage />
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/map' element={<MapComponent/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;