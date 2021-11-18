import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from "react-router-dom";
import Admin from './pages/admin';
import Main from './pages/main';



toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  style: { marginTop: '5em', zIndex: 9999999 }
})

const App = () => {

  return (
    <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/admin" exact>
          <Admin />
        </Route>
      </Switch>
  )
}

export default App;
