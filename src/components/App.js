import React, { Component } from 'react';
import {Switch,Route,Link} from 'react-router-dom'
import Home from './Home'
import Post from './Post'

class App extends Component {
  
  render() {
    return (
      <div>
        
        <nav className="navbar navbar-default navbar-fixed-top text-white">
          <div className="container">
            <Link to="/" className="text-white">
              Readable
            </Link>
          </div>
        </nav>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/posts/add" component={Post} />
          <Route path="/posts/edit/:id" component={Post} />
          <Route render={() => <h4 class="text-center m-5">Sorry...Page not found</h4>} />
        </Switch>
      </div>
    );
  }
}

export default App;
