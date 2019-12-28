import React from 'react';
import { Switch,Route } from 'react-router-dom'
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import './App.css';
import Header from './components/header/header';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up'

function App() {
  return (
    <div className="App">
    	<Header/>
    	<Switch>
    		<Route exact path='/' component={Homepage} />
    		<Route exact path='/shop' component={ShopPage}/>
    		<Route exact path='/signin' component={SignInSignUpPage} />
    	</Switch>
    </div>
  );
}

export default App;
