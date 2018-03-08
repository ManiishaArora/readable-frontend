import React, { Component } from 'react';
import {Switch,Route,Link} from 'react-router-dom'
import Home from './Home'
import AddModifyPost from './posts/AddModify'
import AddModifyComment from './comments/AddModify'
import ViewPost from './posts/View'
import NothingFound from './404'

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
          <Route exact path={'/:category'} component={Home} />
          <Route exact path="/:category/:id" component={ViewPost} />
          <Route exact path="/action/add/post" component={AddModifyPost} />
          <Route path="/posts/edit/:id" component={AddModifyPost} />
          <Route exact path="/actions/add/comment/:postid" component={AddModifyComment} />
          <Route exact path="/edit/comment/:commentid" component={AddModifyComment} />
          <Route exact path="/site/page/404" component={NothingFound} />
          <Route  render={NothingFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
