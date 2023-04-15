import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routes/route';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <BrowserRouter >
      <Routers />

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
