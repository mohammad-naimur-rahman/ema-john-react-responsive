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
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import './App.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setloggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setloggedInUser]}>
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
            <PrivateRoute path='/inventory'>
              <Inventory />
            </PrivateRoute>
            <Route path='/login'>
              <Login />
            </Route>
            <PrivateRoute path='/shipment'>
              <Shipment />
            </PrivateRoute>
            <Route exact path='/'>
              <Shop />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
