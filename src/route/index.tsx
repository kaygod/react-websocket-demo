import React from 'react';
import { HashRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import Home from '../components/Home/index';
import Login from '../components/Login/index';
import { useSelector } from "react-redux";

export default () => {

  const { is_login } = useSelector((state)=>(state.global));

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/" render={()=>{
          return is_login?<Redirect to="/home"/>:<Redirect to="/login"/>
        }} />
      </Switch>
    </Router>
  );
};
