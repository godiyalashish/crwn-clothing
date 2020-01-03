import React from 'react';
import { Switch,Route,Redirect } from 'react-router-dom'
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import './App.css';
import {auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/header/header';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up';
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'

class App extends React.Component {

    unSubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
            if(userAuth){
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                        setCurrentUser ({
                            id:snapShot.uid,
                            ...snapShot.data()
                        });
                })
            }
                setCurrentUser( userAuth );
        })
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }


    render() {  
        return (
            <div className="App">
    	       <Header />
    	       <Switch>
    		      <Route exact path='/' component={Homepage} />
    		      <Route path='/shop' component={ShopPage}/>
    		      <Route exact path='/signin' render = {() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUpPage />)} />
    	       </Switch>
            </div>
  );
}
}

const mapStateToProps = ({ user }) => ({
    currentUser:user.currentUser
})

const mapDispatchToProp = dispatch =>({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProp)(App);
