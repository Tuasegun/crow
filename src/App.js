import React from 'react';
import {connect} from 'react-redux'

import {Route, Switch, Redirect} from 'react-router-dom';
import {Component} from 'react';
import './App.css';

import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import CheckoutPage from './pages/checkout/checkout.component';

import {auth,createUserProfileDocument} from './firebase/firebase.utils';

import {setCurrentUser} from './redux/user/user.actions';
import { selectCurrentUser} from './redux/user/user.selector'
import { createStructuredSelector } from 'reselect';



class App extends Component{
  unsubscribeFromAuth = null 

  componentDidMount(){
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot =>{
          setCurrentUser({
            
              id: snapshot.id,
              ...snapshot.data()
          });
        
        });
      } else{
        setCurrentUser(userAuth)
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
  const {currentUser} = this.props;
    return(
        <div>
          <Header/>
          <Switch>
          <Route exact path='/' component={ShopPage} />
          <Route exact path = '/checkout'  component ={CheckoutPage} />
          </Switch>
          
        </div>

    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser 
})

const mapDispathToProps = dispatch =>({
setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispathToProps)(App);
