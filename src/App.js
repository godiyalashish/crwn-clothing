import React from 'react';
import { Switch,Route } from 'react-router-dom'
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import './App.css';
import {auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/header/header';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up'

class App extends React.Component {
    constructor(){
        super();
        this.state= {
            currentUser:null
        }
    }

    unSubscribeFromAuth = null;

    componentDidMount() {
        this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
            if(userAuth){
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id:snapShot.uid,
                            ...snapShot.data()
                        }
                    }
                )
                })
            }
            else{
                this.setState({
                    currentUser: userAuth
                })
            }
        })
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }


    render() {  
        return (
            <div className="App">
    	       <Header currentUser={this.state.currentUser}/>
    	       <Switch>
    		      <Route exact path='/' component={Homepage} />
    		      <Route exact path='/shop' component={ShopPage}/>
    		      <Route exact path='/signin' component={SignInSignUpPage} />
    	       </Switch>
            </div>
  );
}
}

export default App;
