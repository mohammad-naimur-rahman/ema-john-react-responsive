import './App.css';
import Header from './Components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Shop from './Components/Shop/Shop';
import SelectedProduct from './Components/SelectedProduct/SelectedProduct';
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <div className='container-fluid'>
      <Router>
        <Header />
        <Switch>
          <Route path='/shop'>
            <Shop />
          </Route>
          <Route path='/product/:pdKEY'>
            <SelectedProduct />
          </Route>
          <Route path='/review'>
            <Review />
          </Route>
          <Route path='/inventory'>
            <Inventory />
          </Route>
          <Route exact path='/'>
            <Shop />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
