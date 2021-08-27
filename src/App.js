import React,{useEffect, useState} from 'react';
import Sidebar from './components/Sidebar'
import Home from './components/pages/Home';
import Budget from './components/pages/Budget';
import FrontPage from './components/pages/FrontPage';
import Register from './components/pages/Register';
import IndivisualBudget from './components/pages/IndivisualBudget';
import Profile from './components/pages/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const initialState = {
  userid:'',
  name:'',
  email:'',
  joined:''
}
function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({
    userid: '',
    name: '',
    email: '',
    joined: ''
  })

  const isAuthorized = (message) =>{
    if(message === 'success'){
      setAuth(true)
    }
    if(message === 'signout' || message === 'failure'){
      setUser(initialState)
      setAuth(false)
    }
  }

  const loadUser = (data) => {
    setUser({
      ...user,
      userid: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined
    })
  }
  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user))
    window.localStorage.setItem("auth", JSON.stringify(auth))
  })
  return (
    <div className="App">
    <Router>
    <Switch>
    <Route exact path='/'>
      <FrontPage isAuthorized={isAuthorized} loadUser={loadUser} />
    </Route>
    <Route exact path='/register'>
      <Register isAuthorized={isAuthorized} loadUser={loadUser} />
    </Route>
    {/* <Route exact path='/dashboard'>
    <Sidebar user={user} isAuthorized={isAuthorized} />
     <Home user={user} auth={auth} />
    </Route> */}
    <Route exact path='/dashboard/:id'>
    <Sidebar user={user} isAuthorized={isAuthorized} />
     <Home user={user} auth={auth} />
    </Route>
    <Route exact path='/budget'>
    <Sidebar user={user} isAuthorized={isAuthorized} />
     <Budget user={user} auth={auth} />
    </Route>
    {/* <Route path='/dashboard/:id'>
    <Sidebar user={user} isAuthorized={isAuthorized} />
      <IndivisualBudget auth={auth} />
    </Route> */}
    <Route path='/dashboard/:iduser/:id'>
    <Sidebar user={user} isAuthorized={isAuthorized} />
      <IndivisualBudget auth={auth} />
    </Route>
    <Route path='/profile/:id'>
    <Sidebar user={user} isAuthorized={isAuthorized} />
      <Profile user={user} auth={auth} />
    </Route>
    </Switch>
    </Router>
    </div>
  );
}

export default App;
