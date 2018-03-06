import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom'
import Home from './Home'
import Post from './Post'

class App extends Component {
  
  render() {
    return (
      <div>
        
        <nav className="navbar navbar-default navbar-fixed-top text-white">
          <div className="container">
            Readable
          </div>
        </nav>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/create" component={Post} />
          <Route render={() => <h1>Sorry...Page not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
