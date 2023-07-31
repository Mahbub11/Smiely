import logo from './logo.svg';
import './App.css';
import Router from './routes/Route';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {

  toast.configure({
  theme: 'colored',
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2500,
});

  return (
   <Router></Router>
  );
}

export default App;
